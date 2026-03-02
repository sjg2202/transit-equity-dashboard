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
map.on('load', function(){
    map.addSource('carownership', {
    type: 'geojson',
    data: 'assets/census_tract_with_vehicles.geojson'
})


map.addLayer({
    'id': 'carownc',
    'type' : 'fill',
    'source': 'carownership',
    'paint': {
        'fill-color': [
            'step',
            ['get', 'Pct_No_Vehicle'],
               '#E3BBFC' , // 0 - 9
             20, '#BF63F8', // 10-20
             30, '#9B0BFB', // 20-30
             50, '#63079C',// 50 - 69
             70, '#470570' // 70- 80.6
        ],
         'fill-outline-color': '#BBBBBB',
        'fill-opacity': 0.7,
    }

})

map.on('click', 'carownc', (e) => {
   const prop = e.features[0].properties;
   console.log(prop.KingCounty_Vehicle_Access_Clean_Households_No_Vehicle)
   const vechperc = prop.KingCounty_Vehicle_Access_Clean_Households_No_Vehicle != undefined ? prop.KingCounty_Vehicle_Access_Clean_Households_No_Vehicle: 'N/A';

    if (popup) popup.remove();
    popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: false})
    .setLngLat(e.lngLat)
    .setHTML(`<div> <strong> ${prop.NAME} <strong><br> Percent of Zero Vehicles: ${vechperc} </strong> </div>`)
    .addTo(map)
})

});



// })

