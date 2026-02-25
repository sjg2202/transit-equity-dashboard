mapboxgl.accessToken =
'token';

const map = new mapboxgl.Map({
    container: 'map',
    projection: 'albers',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-122.335167, 47.608013], // Seattle
    zoom: 11
});

