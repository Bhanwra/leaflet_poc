import { Component } from "react";
import 'leaflet/dist/leaflet.css'
import L, { LatLng, LatLngBounds } from 'leaflet'
import mapSVG from './../assets/map.v3.svg'
import mapPNG from './../assets/map.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import standardMarker from './../assets/icons/standard_marker.svg'

let areaLabels = require('../assets/area-labels.json')

export default class Map extends Component {

    constructor(props) {
        super(props)
        this.mapObject = ''
    }

    componentDidMount() {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: iconRetinaUrl,
            iconUrl: standardMarker,
            shadowUrl: shadowUrl
        });

        this.mapObject = L.map('mapWrapper', {
            center: new LatLng(
                76.65549856702918,
                64.68750000000001
            ),
            zoom: 6,
            maxBounds: new LatLngBounds({
                lat: 73.46578809124719,
                lng: 90.52734375
            }, {
                lat: 79.16311751382845,
                lng: 57.31072693809659
            }),
            minZoom: 7,
            maxZoom: 11,
            inertia: false,
            wheelPxPerZoomLevel: 200,
            maxBoundsViscosity: 0.9,
            zoomAnimation: false
        });

        // helper event to locate coordinates and other metadata
        this.mapObject.on("click", (e) => {
            console.log(e)
        })


        L.imageOverlay(mapPNG, [
            [ 79.23753354301057, 52.16308593750001 ], 
            [ 74.28742556085457, 97.82226562500001 ]
        ]).addTo(this.mapObject)
        
        // storing map into the parent's state
        this.props.getMapObject(this.mapObject)
        
        this.showMarker()
    }

    showMarker() {
        for(let i=0; i<areaLabels.areas.length; i++){
            this.labels = L.tooltip({
                permanent: true,
                direction: 'center',
                className: 'labels'
            })
            .setContent(areaLabels.areas[i].title)
            .setLatLng([areaLabels.areas[i].lat, areaLabels.areas[i].lng])
            .addTo(this.mapObject);
        }

    }
    
    render() {
        return (
            <div className="map w-full h-full" id="mapWrapper">
                <div id="swiper-amenities fixed top-0 left-0">
                    {this.props.test}
                </div>
            </div>
        )
    }
}