mapboxgl.accessToken = 'pk.eyJ1Ijoic2d1aWViIiwiYSI6ImNtbTc3ZDM1azBwZXAyeXB6YmdsbWR0bzQifQ.drU3rQYvOmXPEraVrmIW6Q';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-122.335, 47.608],
  zoom: 10.5
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

let popup = null;

map.on('load', () => {
  map.addSource('transit-tracts', {
    type: 'geojson',
    data: 'assets/census_tracts_with_transit_counts.geojson'
  });

  // Fill layer — choropleth by transit_stop_count
  map.addLayer({
    id: 'tracts-fill',
    type: 'fill',
    source: 'transit-tracts',
    paint: {
      'fill-color': [
        'step',
        ['get', 'transit_stop_count'],
        '#f7fbff',       // 1–16
        17, '#c6dbef',   // 17–23
        24, '#6baed6',   // 24–28
        29, '#3182bd',   // 29–35
        36, '#2171b5',   // 36–47
        48, '#1361a9',   // 48–64
        65, '#0a4a8a',   // 65–99
        100, '#08306b'   // 100–280
      ],
      'fill-opacity': 0.8
    }
  }, 'road-label-simple');

  // Outline layer
  map.addLayer({
    id: 'tracts-outline',
    type: 'line',
    source: 'transit-tracts',
    paint: {
      'line-color': '#ffffff',
      'line-width': 0.5,
      'line-opacity': 0.7
    }
  }, 'road-label-simple');

  // Highlight layer (selected tract)
  map.addLayer({
    id: 'tracts-highlight',
    type: 'line',
    source: 'transit-tracts',
    paint: {
      'line-color': '#f0c040',
      'line-width': 2.5
    },
    filter: ['==', 'GEOID20', '']
  }, 'road-label-simple');

  // Click interaction
  map.on('click', 'tracts-fill', (e) => {
    const props = e.features[0].properties;
    const geoid = props.GEOID20 || 'N/A';
    const count = props.transit_stop_count !== undefined ? props.transit_stop_count : 'N/A';

    map.setFilter('tracts-highlight', ['==', 'GEOID20', geoid]);

    if (popup) popup.remove();
    popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: false })
    .setLngLat(e.lngLat)
    .setHTML(`
      <div style="font-family:'Inter',sans-serif; font-size:13px; line-height:1.6;">
        <strong>${props.NAME || 'Census Tract'}</strong><br>
        Transit Stops: <strong>${count}</strong>
      </div>
    `)
    .addTo(map);
  });

  // Hover cursor
  map.on('mouseenter', 'tracts-fill', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'tracts-fill', () => {
    map.getCanvas().style.cursor = '';
  });
});