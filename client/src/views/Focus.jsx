import axios from "axios";
import { Component } from "react";
import { useParams } from "react-router-dom";
import Map from "../components/Map";
import AmenitiesCard from "../components/AmenitiesCard";
import washroomAm from './../assets/images/washroomAm.jpg';
import playgroundAm from './../assets/images/playgroundAm.jpg';
export default class Focus extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            response: ""
        }
    }

    componentDidMount() {
        let url = (typeof this.props.match.params.id === "undefined" ) 
            ? process.env.REACT_APP_API_ROOT+"focus" 
            : process.env.REACT_APP_API_ROOT+"focus/"+this.props.match.params.id

        console.log(url)
        axios.get(url)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    response: response.data
                })

                this.props.setHeaderTitle(this.state.title)
            })
            .catch(error => {
                console.error(error)
            })
    }

    toggleGallery() {
        document.getElementById("gallery").classList.toggle("component-hidden")
    }

    toggleMap() {
        document.getElementById("map").classList.toggle("component-hidden")
    }
    
    toggleAmmenities() {
        document.getElementById("ammenities").classList.toggle("component-hidden")
    }

    render() {
        return (
            <>
                <section className="p-5">
                    <h2 className="text-xl font-medium">About</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex accusamus fuga corrupti facilis architecto dolorum, rem fugiat incidunt illum non, reiciendis, expedita vero labore eveniet asperiores! Cupiditate ipsa nisi magni, facilis corporis minima rem quod aperiam, tempore ad voluptatem consequuntur sit iste maxime voluptate. Minima magnam possimus animi nam omnis?</p>
                </section>
                <section className="p-5">
                    <div className="flex justify-around">
                        <button href="" onClick={this.toggleGallery} className="bg-white p-5 rounded-3xl uppercase font-bold tracking-widest shadow-lg">Gallery</button>
                        <button href="" onClick={this.toggleMap} className="bg-white p-5 rounded-3xl uppercase font-bold tracking-widest shadow-lg">Map</button>
                        <button href="" onClick={this.toggleAmmenities} className="bg-white p-5 rounded-3xl uppercase font-bold tracking-widest shadow-lg">Amenities</button>
                    </div>
                </section>
                <section id="gallery" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-end component-overlay component-hidden">
                    <div className="h-48 flex justify-center items-center">
                        <button className="bg-white p-5 rounded-3xl font-bold shadow-lg" onClick={this.toggleGallery}>close</button>
                    </div>
                    <div className="p-5">
                        <div className="bg-white rounded-2xl shadow-lg p-5">
                            Gallery Goes Here
                        </div>
                    </div>
                </section>
                <section id="map" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-start component-overlay component-hidden">
                    <div id="content" className="h-48 flex justify-center items-center">
                        <button className="bg-white p-5 rounded-3xl font-bold shadow-lg" onClick={this.toggleMap}>close</button>
                    </div>
                    <div className="map-wrapper absolute left-0 top-0 right-0 bottom-0">
                        <Map />
                    </div>
                </section>
                <section id="ammenities" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-end component-overlay component-hidden">
                    <div className="h-48 flex justify-center items-center">
                        <button className="bg-white p-5 rounded-3xl font-bold shadow-lg" onClick={this.toggleAmmenities}>close</button>
                    </div>
                    <div className="p-5">
                        <div className="bg-white rounded-2xl shadow-lg p-5">
                        <section className="card-wrapper p-3">
                        <AmenitiesCard title="Washroom" subtitle="8 points" thumbnail={washroomAm} />
                        <AmenitiesCard title="Playground" subtitle="8 points" thumbnail={playgroundAm} />
                        <AmenitiesCard title="Amenity3" subtitle="8 points" thumbnail={playgroundAm}  />
                        <AmenitiesCard title="Amenity4" subtitle="8 points" thumbnail={playgroundAm}  />
                        <AmenitiesCard title="Amenity5" subtitle="8 points" thumbnail={playgroundAm} />
                        <AmenitiesCard title="Amenity6" subtitle="8 points" thumbnail={playgroundAm} />
                        <AmenitiesCard title="Amenity7" subtitle="8 points" thumbnail={playgroundAm} />
                    </section>
                        </div>
                    </div>
                </section>
            </>
        )
    }

}