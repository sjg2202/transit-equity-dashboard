mapboxgl.accessToken = 'token';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-122.335167, 47.608013], // Seattle
    zoom: 11
});


// reset button
document.getElementById('reset').onclick = function () {
    map.flyTo({
        center: [-122.335167, 47.608013],
        zoom: 11
    });
};