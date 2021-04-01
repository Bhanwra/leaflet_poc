import { Component } from "react";
import 'leaflet/dist/leaflet.css'
import L, { LatLng, LatLngBounds } from 'leaflet'
import mapSVG from './../assets/map.svg'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import axios from "axios";


export default class Map extends Component {

    constructor(props) {
        super(props)
        this.mapObject = ''
    }

    componentDidMount() {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: iconRetinaUrl,
            iconUrl: iconUrl,
            shadowUrl: shadowUrl
        });

        let map = L.map('mapWrapper', {
            center: new LatLng(
                75.29773546875684,
                74.66308593750001
            ),
            zoom: 6,
            maxBounds: new LatLngBounds({
                lat: 78.78489872650539,
                lng: 51.02050781250001
            }, {
                lat: 73.37821477939463,
                lng: 99.49218750000001
            }),
            minZoom: 6,
            maxZoom: 8
        });

        map.on("click", (e) => {
            console.log(e)
        })


        L.imageOverlay(mapSVG, [[79.35958957209913, 50.00976562500001], [72.39570570653261, 100.09765625000001]]).addTo(map)
        class Point {
            constructor(name = "undefined", lat = ((Math.random() * 2) + 74), lng = ((Math.random() * 10) + 70), zoom = 4.5) {
                this.name = name;
                this.lat = lat;
                this.lng = lng;
                this.zoom = zoom;
                this.pin = L.marker([this.lat, this.lng])
                    .addTo(map)
                    .bindTooltip(` This is ${this.name}`)
                    .bindPopup(`<div class="card popup">
                    <h3>
                ${this.name}</h3>
                <img src="https://place-hold.it/137x80">
    
            <div class="icons">
                <svg class="svg-icon" viewBox="0 0 20 20"><path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
                </svg>
                <svg class="svg-icon has-circle" viewBox="0 0 20 20"><path d="M10,1.529c-4.679,0-8.471,3.792-8.471,8.471c0,4.68,3.792,8.471,8.471,8.471c4.68,0,8.471-3.791,8.471-8.471C18.471,5.321,14.68,1.529,10,1.529 M10,17.579c-4.18,0-7.579-3.399-7.579-7.579S5.82,2.421,10,2.421S17.579,5.82,17.579,10S14.18,17.579,10,17.579 M14.348,10c0,0.245-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.201-0.446-0.446s0.2-0.446,0.446-0.446h5C14.146,9.554,14.348,9.755,14.348,10 M14.348,12.675c0,0.245-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.201-0.446-0.446s0.2-0.445,0.446-0.445h5C14.146,12.229,14.348,12.43,14.348,12.675 M7.394,10c0,0.245-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.201-0.446-0.446s0.201-0.446,0.446-0.446h0.849C7.194,9.554,7.394,9.755,7.394,10 M7.394,12.675c0,0.245-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.201-0.446-0.446s0.201-0.445,0.446-0.445h0.849C7.194,12.229,7.394,12.43,7.394,12.675 M14.348,7.325c0,0.246-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.2-0.446-0.446c0-0.245,0.2-0.446,0.446-0.446h5C14.146,6.879,14.348,7.08,14.348,7.325 M7.394,7.325c0,0.246-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.2-0.446-0.446c0-0.245,0.201-0.446,0.446-0.446h0.849C7.194,6.879,7.394,7.08,7.394,7.325"></path>
                </svg>
                <svg class="svg-icon" viewBox="0 0 20 20"><path d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"></path>
                </svg>
                <svg class="svg-icon" viewBox="0 0 20 20"><path d="M14.68,12.621c-0.9,0-1.702,0.43-2.216,1.09l-4.549-2.637c0.284-0.691,0.284-1.457,0-2.146l4.549-2.638c0.514,0.661,1.315,1.09,2.216,1.09c1.549,0,2.809-1.26,2.809-2.808c0-1.548-1.26-2.809-2.809-2.809c-1.548,0-2.808,1.26-2.808,2.809c0,0.38,0.076,0.741,0.214,1.073l-4.55,2.638c-0.515-0.661-1.316-1.09-2.217-1.09c-1.548,0-2.808,1.26-2.808,2.809s1.26,2.808,2.808,2.808c0.9,0,1.702-0.43,2.217-1.09l4.55,2.637c-0.138,0.332-0.214,0.693-0.214,1.074c0,1.549,1.26,2.809,2.808,2.809c1.549,0,2.809-1.26,2.809-2.809S16.229,12.621,14.68,12.621M14.68,2.512c1.136,0,2.06,0.923,2.06,2.06S15.815,6.63,14.68,6.63s-2.059-0.923-2.059-2.059S13.544,2.512,14.68,2.512M5.319,12.061c-1.136,0-2.06-0.924-2.06-2.06s0.923-2.059,2.06-2.059c1.135,0,2.06,0.923,2.06,2.059S6.454,12.061,5.319,12.061M14.68,17.488c-1.136,0-2.059-0.922-2.059-2.059s0.923-2.061,2.059-2.061s2.06,0.924,2.06,2.061S15.815,17.488,14.68,17.488"></path>
                </svg>
        </div>
    
            </div>` );

                this.btn = document.querySelector(`#${this.name}`);
                // this.btn.addEventListener("click", () => {
                //     this.goTo() //NEEDS TO BE A WRAPPED FUNCTION

                // })
            }




            goTo() {
                map.setView({ lat: this.lat, lng: this.lng }, this.zoom);
            }

            showLabel() {
                console.log(this.pin);
                this.pin.openPopup()

            }

        }

        new Point("Special Bridge", 74.8, 77.5);
        new Point("Bench", 53, 250, 7);
        new Point("Point A");
        new Point("Point B");
        new Point("Point C");

        axios({
            method: "GET",
            url: process.env.REACT_APP_API_ROOT
        }).then(success => {
            if (typeof success.data == "object") {
                success.data.forEach(marker => {
                    L.marker([marker.lat, marker.lng]).addTo(map);

                    let popup = L.popup().setLatLng([marker.lat + 0.2, marker.lng]).setContent("This is my marker").openOn(map)
                })
            }
        }).catch(err => {
            console.error(err)
        })

        this.props.getMapObject(map)

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