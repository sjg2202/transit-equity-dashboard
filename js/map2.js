// Map 2 — Median Household Income (ACS 2024 5-year, B19013)

// Shayla token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2d1aWViIiwiYSI6ImNtbTc3ZDM1azBwZXAyeXB6YmdsbWR0bzQifQ.drU3rQYvOmXPEraVrmIW6Q';

// Jenks breaks
var breaks = [78189, 113824, 152528, 205056];

// colors (light -> dark)
var colors = ['#f7fcfd', '#ccece6', '#66c2a4', '#2ca25f', '#006d2c'];

var INCOME_FIELD = 'Income_Num';

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
  // load income geojson
  map.addSource('income', {
    type: 'geojson',
    data: 'assets/income-seattle.geojson'
  });

  // income choropleth
  map.addLayer({
    id: 'income-fill',
    type: 'fill',
    source: 'income',
    paint: {
      'fill-color': {
        property: INCOME_FIELD,
        stops: [
          [0, colors[0]],
          [breaks[0], colors[1]],
          [breaks[1], colors[2]],
          [breaks[2], colors[3]],
          [breaks[3], colors[4]]
        ]
      },
      'fill-opacity': 0.75
    }
  });

  // outline
  map.addLayer({
    id: 'income-outline',
    type: 'line',
    source: 'income',
    paint: {
      'line-color': '#111827',
      'line-opacity': 0.25,
      'line-width': 0.7
    }
  });

  // cursor
  map.on('mouseenter', 'income-fill', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'income-fill', function () {
    map.getCanvas().style.cursor = '';
  });

  // popup on click
  map.on('click', 'income-fill', function (e) {
    var props = e.features[0].properties;

    var tractName =
      props.NAMELSAD || props.NAME || props.TRACT_NAME || 'Census Tract';

    var income = Number(props[INCOME_FIELD]);

    var incomeText = isNaN(income)
      ? 'N/A'
      : '$' + income.toLocaleString();

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        '<b>' + tractName + '</b><br>' +
        'Median household income: ' + incomeText
      )
      .addTo(map);
  });
});