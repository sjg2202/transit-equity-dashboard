// Map 3 — Car Ownership Rate (ACS 2024 5-year, B08201)
// Shayla token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2d1aWViIiwiYSI6ImNtbTc3ZDM1azBwZXAyeXB6YmdsbWR0bzQifQ.drU3rQYvOmXPEraVrmIW6Q';

// Quintile breaks
var breaks = [67.29, 84.57, 89.98, 94.90];

// colors (light -> dark)
var colors = ['#f7fcfd', '#ccece6', '#66c2a4', '#2ca25f', '#006d2c'];

var CAR_FIELD = 'Car_Ownership_Rate';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-122.3321, 47.6062],
  zoom: 10.5,
  minZoom: 9,
  attributionControl: false
});

map.addControl(
  new mapboxgl.AttributionControl({
    customAttribution: 'Transit Equity Dashboard | GEOG 458'
  })
);

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// reset button
document.getElementById('reset').onclick = function () {
  map.flyTo({
    center: [-122.335167, 47.608013],
    zoom: 11
  });
};

map.on('load', function () {
  // load car ownership geojson
  map.addSource('car-ownership', {
    type: 'geojson',
    data: 'assets/seattle_car_ownership.geojson'
  });

  // car ownership choropleth
  map.addLayer({
    id: 'car-fill',
    type: 'fill',
    source: 'car-ownership',
    paint: {
      'fill-color': {
        property: CAR_FIELD,
        stops: [
          [0,          colors[0]],
          [breaks[0],  colors[1]],
          [breaks[1],  colors[2]],
          [breaks[2],  colors[3]],
          [breaks[3],  colors[4]]
        ]
      },
      'fill-opacity': 0.75
    }
  });

  // outline
  map.addLayer({
    id: 'car-outline',
    type: 'line',
    source: 'car-ownership',
    paint: {
      'line-color': '#111827',
      'line-opacity': 0.25,
      'line-width': 0.7
    }
  });

  // cursor
  map.on('mouseenter', 'car-fill', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'car-fill', function () {
    map.getCanvas().style.cursor = '';
  });

  // popup on click
  map.on('click', 'car-fill', function (e) {
    var props = e.features[0].properties;

    var tractName =
      props.NAMELSAD || props.NAME || props.TRACT_NAME || 'Census Tract';

    var rate = Number(props[CAR_FIELD]);
    var noVehicle = Number(props['Pct_No_Vehicle']);
    var totalHH = Number(props['Total_Households']);
    var noVehicleHH = Number(props['Households_No_Vehicle']);

    var rateText = isNaN(rate) ? 'N/A' : rate.toFixed(1) + '%';
    var noVehicleText = isNaN(noVehicle) ? 'N/A' : noVehicle.toFixed(1) + '%';
    var totalText = isNaN(totalHH) ? 'N/A' : totalHH.toLocaleString();
    var noVehicleHHText = isNaN(noVehicleHH) ? 'N/A' : noVehicleHH.toLocaleString();

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        '<b>' + tractName + '</b><br>' +
        'Car ownership rate: ' + rateText + '<br>' +
        'No vehicle: ' + noVehicleText + '<br>' +
        'Total households: ' + totalText + '<br>' +
        'Zero-vehicle households: ' + noVehicleHHText
      )
      .addTo(map);
  });
});