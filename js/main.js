mapboxgl.accessToken = 'pk.eyJ1Ijoic2d1aWViIiwiYSI6ImNtbTc3ZDM1azBwZXAyeXB6YmdsbWR0bzQifQ.drU3rQYvOmXPEraVrmIW6Q';

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

// filters
var layerSelect = document.getElementById('layerSelect');

if (layerSelect) {
  layerSelect.addEventListener('change', function (e) {

    var selected = e.target.value;

    if (selected === 'income') {
      if (map.getLayer('income-fill')) {
        map.setLayoutProperty('income-fill', 'visibility', 'visible');
      }

      if (map.getLayer('income-outline')) {
        map.setLayoutProperty('income-outline', 'visibility', 'visible');
      }
    }

  });
}

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
