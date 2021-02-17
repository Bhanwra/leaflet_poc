document.addEventListener("DOMContentLoaded", () => {

    let testButtonOntario = document.querySelector("#ontarioBtn")

    let mapInit = L.map('mapWrapper', {
        center: [75, 150],
        zoom: 3
    });

    // second mapwrapper
    let secondmapInit = L.map('secondmapWrapper', {
        center: [75, 150],
        zoom: 3
    })

    let svg = './assets/north-america.svg'
    let svgBounds = [
        [0, 0],
        [100, 300]
    ];

    // second map svg
    L.imageOverlay(svg, svgBounds).addTo(mapInit)

    // _pop_ups_
    let popup = L.popup()
        .setLatLng({lat: 65.5129625532949, lng: 221.66015625})
        .setContent(
            `<div class="card">
                This is Ontario
            </div>`
        ).openOn(mapInit)


    // on_click
    mapInit.on("click", (event) => {
        console.log(event)
    })

    testButtonOntario.addEventListener("click", (event) => {
        mapInit.setView({lat: 65.07213008560697, lng: 225.3515625}, 5)
    })
})