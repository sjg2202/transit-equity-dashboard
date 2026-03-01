mapboxgl.accessToken =
'pk.eyJ1Ijoia25lbDIiLCJhIjoiY21rdTlkYmx5MThyZjNmcHVrMDYzdXJ4dyJ9.HrXpvWOlXxo7fGCGnGQG6A';

const map = new mapboxgl.Map({
    container: 'map',
    projection: 'albers',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-122.335167, 47.608013], // Seattle
    zoom: 11
});

// map.addSource('carownership', {
//     type: 'geojson',
//     data: 'assets/KingCounty_Vehicle_Access_Clean.json'
// })

// map.addLayer({
//     'id': 'carownc'
//     'type' : 'fill',
//     'source': 'carownership',
//     'paint' {
//         'fill-color': [
//             'step',
//             ['get', 'density'],

//         ]
//     }

// })

