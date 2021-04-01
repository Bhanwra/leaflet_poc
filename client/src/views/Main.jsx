import { Component, createRef } from "react"
import L, { LatLng, LatLngBounds } from 'leaflet'

import Card from "../components/Card"
import Map from "../components/Map"


import washroomAm from './../assets/images/washroomAm.svg';
import playgroundAm from './../assets/images/playgroundAm.svg';
import AmenitiesCard from "../components/AmenitiesCard";
import Gallery from "../components/Gallery";

// markers
import standardMarker from './../assets/icons/standard.svg'

let marker = null
let temporaryLines = []

const imageFolder = require.context('./../assets/images/focus', true)

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isPointOfInterestSelected: false,
            pointOfInterest: {
                title: '',
                description: '',
                hours: '',
                coordinates: {
                    lat: 0,
                    lng: 0
                },
                images: [],
                amenities: []
            },
            pointOfInterestMenu: false, // true = open, false = close
            mapObject: false,
            preload: false
        }

        this.cardRef = createRef()
    }

    componentDidMount() {
        marker = (type) => {
            try {
                return L.icon({
                    iconUrl: require(`./../assets/icons/${type}.svg`).default,
                    iconRetinaUrl: require(`./../assets/icons/${type}.svg`).default,
                    iconSize: [45.5, 57.6],
                    iconAnchor: [22.75, 57.6]
                })
            } catch (ex) {
                return L.icon({
                    iconUrl: require(`./../assets/icons/standard.svg`).default,
                    iconRetinaUrl: require(`./../assets/icons/standard.svg`).default,
                    iconSize: [45.5, 57.6],
                    iconAnchor: [22.75, 57.6]
                })
            }
        }

        if ( this.props.preload ) {
            try {
                let checkMapLoaded = setInterval(() => {
                    if ( this.state.mapObject ) {
                        clearInterval(checkMapLoaded)
                        this.focusOn(this.props.points[this.props.match.params.id])
                    }
                }, 100)
            } catch ( ex ) {
                console.warn(ex)
            }
        }
    }

    focusOn(point) {

        if ( this.state.mapObject ) {
            this.state.mapObject.flyTo({
                lat: point.coordinates.lat,
                lng: point.coordinates.lng
            }, point.coordinates.zoom, {
                animate: true,
                duration: 2
            })

            this.showOnMap(point.coordinates.lat, point.coordinates.lng, point.coordinates.zoom, null, "You Are Here!")
        }


        this.setState({
            isPointOfInterestSelected: true,
            pointOfInterest: {
                title: point.title,
                description: point.description,
                coordinates: {
                    lat: point.coordinates.lat,
                    lng: point.coordinates.lng,
                },
                images: point.images,
                amenities: point.amenities,
                explore: point.explore
            },
            pointOfInterestMenu: false
        })

        if (this.cardRef.current) {
            this.cardRef.current.setState({
                currentTab: 0,
                cardContent: this.generateInfoTab(point.description, point.images)
            })
        }
    }

    togglePointOfInterestMenu() {
        this.setState({
            pointOfInterestMenu: (this.state.pointOfInterestMenu) ? false : true
        })
    }

    getMapObject(obj) {
        this.setState({
            mapObject: obj
        })
    }

    generateInfoTab(description, imageList) {
        let images = []

        if (imageList) {
            imageList.forEach(image => {
                try {
                    let imgSrc = imageFolder(`./${image}`)
                    images.push(imgSrc.default)
                } catch (ex) {
                    // invalid image
                }
            })
        }

        return (
            <div className="p-4">
                <h3 className="font-medium uppercase tracking-widest mb-2">About</h3>
                <div className="flex">
                    <Gallery images={images} variant="flex" />
                </div>
                {description}
            </div>
        )
    }

    showOnMap(lat, lng, zoom, type, text = '') {

        console.log(`Showing`, lat, lng, 'Zoom', zoom, 'Type', type, 'text', text)

        let myMarker = L.marker({
            lat: lat,
            lng: lng
        }, {
            icon: marker(type),
            riseOnHover: true
        })

        myMarker.bindPopup(L.popup({
            className: 'popup-theme',
            closeButton: false,
            autoClose: false,
            closeOnClick: false
        }).setContent(`<p class="uppercase font-bold my-2 tracking-wider text-center">${text}</p>`), {offset: [0, -57.6]}).addTo(this.state.mapObject)
        myMarker.openPopup()

        this.state.mapObject.flyTo({
            lat: lat,
            lng: lng
        }, zoom)
    }

    fromPointToPoint(from, to) {

        let firstMarker = L.marker({
            lat: from.coordinates.lat,
            lng: from.coordinates.lng
        }, {
            icon: marker(''),
            riseOnHover: true
        })

        firstMarker.bindPopup(L.popup({
            className: 'popup-theme',
            closeButton: false,
            autoClose: false,
            closeOnClick: false
        }).setContent(`<p class="uppercase font-bold my-2 tracking-wider">${from.title}</p>`), {offset: [0, -57.6]}).addTo(this.state.mapObject)
        firstMarker.openPopup()

        let secondMarker = L.marker({
            lat: to.coordinates.lat,
            lng: to.coordinates.lng
        }, {
            icon: marker(''),
            riseOnHover: true
        })

        secondMarker.bindPopup(L.popup({
            className: 'popup-theme',
            closeButton: false,
            autoClose: false,
            closeOnClick: false
        }).setContent(`<p class="uppercase font-bold my-2 tracking-wider">${to.title}</p>`), {offset: [0, -57.6]}).addTo(this.state.mapObject)
        
        secondMarker.openPopup()

        if ( this.state.mapObject ) {
            this.state.mapObject.flyTo({
                lat: to.coordinates.lat,
                lng: to.coordinates.lng
            }, to.coordinates.zoom)

            if ( temporaryLines.length > 0 ) {
                temporaryLines.forEach(line => {
                    line.removeFrom(this.state.mapObject)
                })
            }

            let line = L.polyline([
                [from.coordinates.lat, from.coordinates.lng],
                [to.coordinates.lat, to.coordinates.lng]
            ], {
                className: "temporary-polyline"
            }).addTo(this.state.mapObject)

            temporaryLines.push(line)
        }
    }

    clearMarkers() {
        if ( this.state.mapObject ) {
            this.state.mapObject.eachLayer(layer => {
                if (layer.options.icon ) {
                    this.state.mapObject.removeLayer(layer)
                }
            })

            if ( temporaryLines.length > 0 ) {
                temporaryLines.forEach(line => {
                    line.removeFrom(this.state.mapObject)
                })
            }
        }
    }

    render() {

        if ( this.state.preload ) {
            console.log(`Preloaded`, this.props)
            if ( this.state.isPointOfInterestSelected ) {
                console.log(this.state)
            }
        }
        

        let pointsOfInterest = Object.keys(this.props.points).map((index) => {
            let point = this.props.points[index]
            return (
                <div key={`poi_${index}`} className="bg-white px-4 py-2 shadow-md rounded-xl cursor-pointer" onClick={() => { this.focusOn(point) }} >{point.title}</div>
            )
        })

        let amenities = false

        if (this.state.pointOfInterest.amenities) {
            amenities = this.state.pointOfInterest.amenities.map((amenity, index) => {
                return ( <AmenitiesCard key={`amenity_${index}`} title={amenity.title} subtitle={`${Math.round(0).toFixed(2)}km`} thumbnail={playgroundAm} clicked={(arg) => {
                    this.showOnMap(amenity.coordinates.lat, amenity.coordinates.lng, amenity.coordinates.zoom, amenity.type, amenity.title)
                }} />)
            })
        }

        let explore = false

        if (this.state.pointOfInterest.explore) {
            explore = this.state.pointOfInterest.explore.map((amenity, index) => {
                return ( <AmenitiesCard key={`amenity_${index}`} title={amenity.title} subtitle={`${Math.round(0).toFixed(2)}km`} thumbnail={playgroundAm} clicked={(arg) => {
                    this.showOnMap(amenity.coordinates.lat, amenity.coordinates.lng, amenity.coordinates.zoom, amenity.type, amenity.title)
                }} />)
            })
        }

        let tabs = []

        tabs.push({
            title: "Info",
            content: this.generateInfoTab(this.state.pointOfInterest.description, this.state.pointOfInterest.images)
        })

        if (amenities) {
            tabs.push({
                title: "Amenities",
                content: (
                    <div className="flex-wrap bg-white p-5 card-wrapper">
                        { amenities}
                    </div>
                )
            })
        }

        if (explore) {
            tabs.push({
                title: "Explore",
                content: (
                    <div className="flex-wrap bg-white p-5 card-wrapper">
                        { explore }
                    </div>
                )
            })
        }


        return (
            <>
                <div className="map-wrapper fixed top-0 left-0 w-full h-full m-0 p-0 z-0">
                    <Map getMapObject={(obj) => { this.getMapObject(obj) }} showOnMap={this.showOnMap} />
                </div>
                <div className={`fixed bottom-0 left-0 w-full max-h-full p-5 pb-0 md:bottom-auto md:max-w-md md:left-auto md:right-0 md:top-0 component ${this.state.isPointOfInterestSelected ? '' : 'component-hidden'}`}>
                    <Card ref={this.cardRef} title={this.state.pointOfInterest.title} tabs={tabs} thisPoint={this.state.pointOfInterest} allPoints={this.props.points} onGoToChanged={(from, to) => {
                        if ( this.state.mapObject ) {

                            this.showOnMap(to.coordinates.lat, to.coordinates.lng, to.coordinates.zoom, null,
                                    `<span class="block">${to.title}</span>
                                    <small class="mb-3 block"><span class="bg-theme-colors-purple text-white p-1 px-1.5 rounded-xl inline-block">1.9km</span> from ${from.title}</small>
                                    <button class="bg-theme-orange-500 uppercase text-white p-2 rounded-xl w-full block" onclick="${this.focusOn(to)}">Explore</button>`
                                )
                        }
                    }} closeAction={() => {
                        this.setState({ isPointOfInterestSelected: false, pointOfInterestMenu: false })
                        this.clearMarkers()
                    }} />
                </div>
                <div className={`fixed top-0 right-0 w-8/12 max-h-full p-2 md:bottom-auto md:max-w-md md:left-auto md:right-0 md:top-0 dropdown`}>
                    <div className="bg-white rounded-xl overflow-hidden">
                        <div className="flex flex-row bg-theme-colors-orange text-white shadow-lg rounded-xl transition uppercase tracking-widest items-end">
                            <a href="#" className="block w-full p-2 text-center" onClick={() => { this.togglePointOfInterestMenu() }}>Waterfront Trail</a>
                        </div>
                        <div className={`grid grid-cols-1 gap-4 rounded-xl overflow-hidden bg-gray-100 transition-all ${(this.state.pointOfInterestMenu) ? 'p-4' : 'opacity-0 h-0 p-0'}`}>
                            { pointsOfInterest }
                        </div>
                    </div>
                </div>

            </>
        )
    }
}