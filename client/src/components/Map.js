import { Component } from "react";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import mapSVG from './../assets/north-america.svg'

export default class Map extends Component {

    componentDidMount() {

        let map = L.map('mapWrapper', {
            center: [75, 150],
            zoom: 3
        });

        L.imageOverlay(mapSVG, [[0, 0], [100, 300]]).addTo(map)
    }

    render() {
        return(
            <div className="map" id="mapWrapper">

            </div>
        )
    }
}