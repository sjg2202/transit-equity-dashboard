// Providing Oscars Mapbox API key
mapboxgl.accessToken = 'pk.eyJ1Ijoib2Nhc3RpIiwiYSI6ImNtaGJlcHR0bzBkbHEyam9hZjUxdTN2em8ifQ.1dlbHGkcsfz7UDrymlleLA';

const map = new mapboxgl.Map ({
    container: 'map',
    // Light basemap
    style: 'mapbox://styles/mapbox/light-v11', 
    zoom: 10.5,
    minZoom: 9, // Prevents user from zooming out too far.
    center: [-122.3321, 47.6062] // Centered on Seattle
});

// Waiting for basemap to load before adding custom data.
map.on('load', () => {

    // This points Mapbox to the file containing the census tract shapes
    // Add Census Tract GeoJSON file as a data source.
    map.addSource('tracts', {
        type: 'geojson',
        data: 'assets/king_county_tracts.geojson' // Update path 
    });


    map.addLayer({
        'id': 'tracts-fill',
        'type': 'fill',     // 'fill' for polygons
        'source': 'tracts',
        'paint' : {
            // Color the tracts based on the % of households w/ no vehicles.
            'fill-color': [
                'step', // Fixed missing comma
                ['get', 'Pct_No_Vehicle'], 
                '#f1eef6', 5,   //0-5%: Light gray/blue
                '#bdc9e1', 15,  //5-15%: Light blue
                '#74a9cf', 30,  //15-30%: Medium blue
                '#0570b0'       //30%+: Dark blue (Transit Deserts)
            ],
            'fill-opacity': 0.8,      // Makes the tracts slightly transparent.
            'fill-outline-color': '#ffffff'  // Fixed spelling of fill-outline-color
        }
    });     
}); // End of map.on('load') block

// C3 Bar Chart
// Builds the chart in the sidebar, feeding it dummy data (zeros) for now
// until we write function to extract live data from the map.
let chart = c3.generate({
    bindto: '#equity-chart',
    data: {
        columns: [
            ['Low Need (<5% No Car)', 0],
            ['Moderate Need (5-15%)', 0],
            ['High Need (15-30%)', 0],
            ['Critical Need (30%+)', 0] 
        ],
        type: 'bar', // type of bar chart
        colors: {
            // Matches the chart colors exactly to the map layer colors
            // Added # to all hex codes
            'Low Need (<5% No Car)': '#f1eef6',
            'Moderate Need (5-15%)': '#bdc9e1',
            'High Need (15-30%)': '#74a9cf',
            'Critical Need (30%+)': '#0570b0'
        }
    },
    axis: {
        x: { show: false },   // hides bottom axis to save space
        y: {
            label: {
                text: 'Number of Tracts',   // Labels the vertical axis
                position: 'outer-middle'
            }
        }
    },
    legend: {
        position: 'bottom' // Moves chart key to the bottom
    }
});