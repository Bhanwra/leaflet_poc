import axios from "axios";
import { Component } from "react";
import Card from "../components/Card";
import Map from "../components/Map";

import L, { LatLng, LatLngBounds } from 'leaflet'

export default class MapInput extends Component {

    constructor(props) {
        super(props)

        this.defaultState = {
            menuOpen: false,
            mapObject: false,
            title: '',
            coordinates: {
                lat: '',
                lng: '',
                zoom: ''
            },
            description: '',
            pointsOnMap: {}
        }

        this.state = this.defaultState
    }

    componentDidMount() {
        this.getPoints()
    }

    getMapObject(obj) {

        obj.on("click", (e) => {
            this.setState({
                menuOpen: true,
                coordinates: {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    zoom: e.target._zoom
                }
            })

            L.popup({
                    autoClose: false,
                    className: "popup-theme"
                })
                .setLatLng(new LatLng(e.latlng.lat, e.latlng.lng))
                .setContent('<p class="p-0 text-md tracking-widest">ADD POINT HERE</p>')
                .addTo(obj)
        })

        this.setState({
            mapObject: obj
        })
    }

    handleForm(e) {
        e.preventDefault()

        axios({ url: `${process.env.REACT_APP_API_ROOT}points/insert`, method: "POST", data: {
            title: this.state.title,
            description: this.state.description,
            coordinates: this.state.coordinates
        } })
            .then((response) => {
                if ( response.status == 200 ) {
                    if ( !response.data.error ) {
                        this.getPoints()
                        this.setState({
                            menuOpen: false,
                            title: "",
                            description: ""
                        })
                    }
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    getPoints() {
        axios({
            url: process.env.REACT_APP_API_ROOT + 'points',
            method: "GET"
        })
        .then(res => {
            if ( res.status == 200 ) {
                if ( typeof res.data === "object" && res.data.length > 0 ) {
                    this.setState({
                        pointsOnMap: res.data
                    })

                    this.populatePoints()
                }
            }
        })
        .catch(err => {
            console.error(err)
        })
    }

    populatePoints() {

        if ( this.state.mapObject ) {
    
            Object.keys(this.state.pointsOnMap).map(index => {
                L.marker({
                    lat: this.state.pointsOnMap[index].coordinates.lat,
                    lng: this.state.pointsOnMap[index].coordinates.lng
                }, {
                    title: this.state.pointsOnMap[index].title
                })
                .bindTooltip(this.state.pointsOnMap[index].title)
                .addTo(this.state.mapObject)
            })

            this.state.mapObject.eachLayer(layer => {
                console.log(layer)
            })
        }

    }

    render() {

        let form = (
            <form id="form" onSubmit={this.handleForm.bind(this)} className="grid grid-cols-1">
                <section className="grid grid-cols-1 gap-1 mb-4">
                    <label htmlFor="title" className=" mb-0">Title</label>
                    <input type="text" className="p-2 bg-white shadow rounded-lg focus:outline-none border-2 border-transparent focus:border-blue-300 transition" value={ this.state.title } onChange={(e) => { this.setState({ ...this.state, title: e.target.value }) }}/>
                </section>
                <section className="grid grid-cols-1 gap-1 mb-4">
                    <label htmlFor="description" className=" mb-0">Description</label>
                    <textarea name="" id="" cols="30" rows="10" className="p-2 bg-white shadow rounded-lg focus:outline-none border-2 border-transparent focus:border-blue-300 transition"  onChange={(e) => { this.setState({ ...this.state, description: e.target.value }) }} value={ this.state.description }>
                    </textarea>
                </section>
                <section className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label htmlFor="title" className=" mb-0">Latitude</label>
                        <input type="text" className="p-2 max-w-full overflow-ellipsis bg-white shadow rounded-lg focus:outline-none border-2 border-transparent focus:border-blue-300 transition" value={ this.state.coordinates.lat } readOnly/>
                    </div>
                    <div>
                        <label htmlFor="title" className=" mb-0">Longitude</label>
                        <input type="text" className="p-2 max-w-full overflow-ellipsis bg-white shadow rounded-lg focus:outline-none border-2 border-transparent focus:border-blue-300 transition" value={ this.state.coordinates.lng } readOnly/>
                    </div>
                    <div>
                        <label htmlFor="title" className=" mb-0">Zoom</label>
                        <input type="text" className="p-2 max-w-full overflow-ellipsis bg-white shadow rounded-lg focus:outline-none border-2 border-transparent focus:border-blue-300 transition" value={ this.state.coordinates.zoom } readOnly/>
                    </div>
                </section>
            </form>
        )

        return(
            <>
                <div className="map-wrapper fixed top-0 left-0 w-full h-full m-0 p-0 z-0">
                    <Map getMapObject={(obj) => {this.getMapObject(obj)}} />
                </div>
                <div className={`fixed bottom-0 left-0 w-full max-h-full p-5 md:bottom-auto md:max-w-md md:left-auto md:right-0 md:top-0 component ${this.state.menuOpen ? '' : 'component-hidden'}`}>
                    <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                        <div className="p-4 py-3 text-xl font-medium flex justify-between">
                            <span>Add Point</span>
                            <span className="bg-white hover:bg-red-700 hover:text-white transition rounded-xl px-3 py-2 flex justify-center items-center text-sm shadow" onClick={() => {
                                this.setState({
                                    menuOpen: false
                                })
                            }}>X</span>
                        </div>
                        <div className="px-4">
                            {form}
                        </div>
                        <div className="p-4 flex">
                            <button form="form" className="bg-white w-full focus:outline-none transition outline-none focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white font-medium px-4 py-2 uppercase tracking-widest rounded-lg shadow-md">Save</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}