import { Component } from "react";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import mapSVG from './../assets/map.svg'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import axios from "axios";



export default class Map extends Component {

    componentDidMount() {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: iconRetinaUrl,
            iconUrl: iconUrl,
            shadowUrl: shadowUrl
        });

        let map = L.map('mapWrapper', {
            center: [75.76434445914344, 75.52001953125001],
            zoom: 6
        });

        map.on("click", (e) => {
            console.log(e)
        })

        L.imageOverlay(mapSVG, [[79.35958957209913, 50.00976562500001], [72.39570570653261, 100.09765625000001]]).addTo(map)

        axios({
            method: "GET",
            url: "http://localhost:3100/"
        }).then(success => {
            if ( typeof success.data == "object" ) {
                success.data.forEach(marker => {
                    L.marker([marker.lat, marker.lng]).addTo(map);

                    let popup = L.popup().setLatLng([marker.lat + 0.2, marker.lng]).setContent("This is my marker").openOn(map)
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }

    render() {
        return(
            <div className="map" id="mapWrapper">

            </div>
        )
    }
}