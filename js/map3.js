mapboxgl.accessToken =
'pk.eyJ1Ijoia25lbDIiLCJhIjoiY21rdTlkYmx5MThyZjNmcHVrMDYzdXJ4dyJ9.HrXpvWOlXxo7fGCGnGQG6A';

const map = new mapboxgl.Map({
    container: 'map',
    projection: 'albers',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-122.335167, 47.608013], // Seattle
    zoom: 11
});

let popup = null;

// map.on('load', () => {


async function geojsonFetch() {
    let response = await fetch('assets/census_tract_with_vehicles.geojson');
    let carownership = await response.json();

    map.on('load', function loaddata() {
     map.addSource('carownership', {
        type: 'geojson',
        data: carownership
    })

// })

map.addLayer({
    'id' : 'carownc',
    'type' : 'fill',
    'source': 'carownership',
    'paint' : {
        'fill-color': [
            'step',
            ['get', 'KingCounty_Vehicle_Access_Clean_Pct_No_Vehicle'],
               '#E3BBFC' , // 0 - 9
             10, '#BF63F8', // 10-20
             20, '#9B0BFB', // 20-49
             50, '#63079C',// 50 - 69
             80, '#470570' // 70- 80
        ],
         'fill-outline-color': '#BBBBBB',
        'fill-opacity': 0.9,

    }


});


map.on('click', 'carownc', (e) => {
   const prop = e.features[0].properties;
   console.log(prop.KingCounty_Vehicle_Access_Clean_Pct_No_Vehicle)
   const vechperc = prop.KingCounty_Vehicle_Access_Clean_Pct_No_Vehicle != undefined ? prop.KingCounty_Vehicle_Access_Clean_Pct_No_Vehicle: 'N/A';

    if (popup) popup.remove();
    popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: false})
    .setLngLat(e.lngLat)
    .setHTML(`<div> <strong> ${prop.NAME} <strong><br> Percent of Zero Vehicles: ${vechperc} </strong> </div>`)
    .addTo(map)
});
})
};

geojsonFetch();



