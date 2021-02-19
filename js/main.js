document.addEventListener("DOMContentLoaded", () => {

    let map = document.querySelector("#map");

    map = L.map('map').setView([0,0], 1);

    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=CS1e8lnFXJdFvQu4vYTi', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);

    let marker1 = L.marker([43.928822, -78.877243]).addTo(map);

    let marker2 = L.marker([48.8584, 2.2945]).addTo(map);

    marker1.bindPopup("Durham College").openPopup();

    marker2.bindPopup("Eiffel Tower").openPopup();
})