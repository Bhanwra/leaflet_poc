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
                308,
                500
            ),
            zoom: 1.5,
            maxBounds: new LatLngBounds({
                lat: 611,
                lng: 995
            }, {
                lat: 5,
                lng: 5
            }),
            minZoom: 1,
            maxZoom: 3,
            zoomDelta: 0.5,
            zoomSnap: 0.5,
            wheelPxPerZoomLevel: 200,
            maxBoundsViscosity: 0.95,
            crs: L.CRS.Simple
        });

        // helper event to locate coordinates and other metadata
        this.mapObject.on("click", (e) => {
            console.log(`"lat": ${e.latlng.lat},\n"lng": ${e.latlng.lng}`)
        })

        L.imageOverlay(mapPNG, [
            [ 0, 0 ], 
            [ 616, 1000 ]
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