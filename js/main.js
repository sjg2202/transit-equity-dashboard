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