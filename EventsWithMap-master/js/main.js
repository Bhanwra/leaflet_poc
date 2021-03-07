document.addEventListener("DOMContentLoaded", () => {

    let testButtonOntario = document.querySelector("#ontarioBtn")

    let mapInit = L.map('mapWrapper', {
        center: [43.65346204630046, -79.383964240551],
        zoom: 3
    });

    // let svg = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Jq6rfX3IgbCZZevdCp01'
    // let svgBounds = [
    //     [0, 0],
    //     [100, 300]
    // ];

    // L.imageOverlay(svg, svgBounds).addTo(mapInit)
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Jq6rfX3IgbCZZevdCp01',
    {
        attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(mapInit);

    // _pop_ups_
    let popup = L.popup()
        .setLatLng({lat: 43.65346204630046, lng: -79.383964240551})
        .setContent(
            `<div class="card">
                This is Toronto
            </div>`
        ).openOn(mapInit);


    // on_click
    mapInit.on("click", (event) => {
        console.log(event)
    })

    testButtonOntario.addEventListener("click", (event) => {
        mapInit.setView({lat: 43.65346204630046, lng: -79.383964240551}, 13)
    })
})