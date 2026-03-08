// Shayla's token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2d1aWViIiwiYSI6ImNtbTc3ZDM1azBwZXAyeXB6YmdsbWR0bzQifQ.drU3rQYvOmXPEraVrmIW6Q';

// map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-122.335167, 47.608013], // Seattle
    zoom: 11,
    minZoom: 9,
    attributionControl: false
});

// attributes
map.addControl(new mapboxgl.AttributionControl({
    customAttribution: 'Transit Equity Dashboard | GEOG 458'
}));

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// reset button
document.getElementById('reset').onclick = function () {
    map.flyTo({
        center: [-122.335167, 47.608013],
        zoom: 11
    });

    // re-check all layer toggles
    document.getElementById('toggleIncome').checked = true;
    document.getElementById('toggleCar').checked = true;
    document.getElementById('toggleStopDensity').checked = true;

    // turn layers back on
    ['income-fill', 'income-outline'].forEach(id => {
        if (map.getLayer(id)) {
            map.setLayoutProperty(id, 'visibility', 'visible');
        }
    });

    if (map.getLayer('car-fill')) {
        map.setLayoutProperty('car-fill', 'visibility', 'visible');
    }

    ['tracts-fill', 'tracts-outline', 'tracts-highlight'].forEach(id => {
        if (map.getLayer(id)) {
            map.setLayoutProperty(id, 'visibility', 'visible');
        }
    });

    // remove highlights
    map.setFilter('tracts-highlight', ['==', 'GEOID20', '']);
    map.setFilter('income-highlight', ['==', 'GEOID', '']);
    map.setFilter('car-highlight', ['==', 'GEOID20', '']);

    // reset KPI values
    document.getElementById('stop-count').textContent = '—';
    document.getElementById('median-income').textContent = '—';
    document.getElementById('pct-no-vehicle').textContent = '—';

    // hide chart panel again
    document.getElementById('chart-panel').style.display = 'none';

    // close any popups
    const popups = document.getElementsByClassName('mapboxgl-popup');
    if (popups.length) {
        popups[0].remove();
    }

    // legend 
    updateLegend();
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

// layers
const INCOME_FIELD = 'Income_Num';
const incomeBreaks = [78189, 113824, 152528, 205056];
const incomeColors = ['#f7fcfd', '#ccece6', '#66c2a4', '#2ca25f', '#006d2c'];

const CAR_FIELD = 'Pct_No_Vehicle';
const carBreaks = [19.29, 44.57, 50.98, 80.90];
const carColors = ['#E3BBFC', '#BF63F8', '#9B0BFB', '#8a8a8a', '#470570'];

// legend
function updateLegend() {
    const body = document.getElementById('legend-body');
    let html = '';

    if (document.getElementById('toggleIncome').checked) {
        html += `
            <div class="legend-section-title">Median Household Income</div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#f7fcfd;">
                </span>
                <span>$17,500 - $93,369</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#ccece6;">
                </span>
                <span>$93,369 - $119,877</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#66c2a4;">
                </span>
                <span>$119,877 - $140,798</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#2ca25f;">
                </span>
                <span>$140,798 - $175,314</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#006d2c;">
                </span>
                <span>$175,314 - $250,001+</span>
            </div>
        `;
    }

    if (document.getElementById('toggleCar').checked) {
        html += `
            <div class="legend-section-title" style="margin-top:10px;">% No Vehicle</div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#E3BBFC;">
                </span>
                <span>0% - 5%</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#BF63F8;">
                </span>
                <span>6% - 30%</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#9B0BFB;">
                </span>
                <span>31% - 49%</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#63079C;">
                </span>
                <span>50% - 80.6%</span>
            </div>
        `;
    }

    if (document.getElementById('toggleStopDensity').checked) {
        html += `
            <div class="legend-section-title" style="margin-top:10px;">Transit Stop Density</div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#f7fbff;">
                </span>
                <span>1 - 16 stops</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#c6dbef;">
                </span>
                <span>17 - 23 stops</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#6baed6;">
                </span>
                <span>24 - 28 stops</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#3182bd;">
                </span>
                <span>29 - 35 stops</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#2171b5;">
                </span>
                <span>36 - 47 stops</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#1361a9;">
                </span>
                <span>48 - 64 stops</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#0a4a8a;">
                </span>
                <span>65 - 99 stops</span>
            </div>

            <div class="legend-row">
                <span 
                    class="legend-swatch" 
                    style="background:#08306b;">
                </span>
                <span>100 - 280 stops</span>
            </div>
        `;
    }

    body.innerHTML = html || '<div style="color:#6b7280;font-size:12px;">No layers selected</div>';
}

// KPI panel
function updateKPI(stopCount, income, pctNoVehicle) {
    document.getElementById('stop-count').textContent =
        stopCount != null ? stopCount : '—';
    document.getElementById('median-income').textContent =
        income != null ? '$' + Number(income).toLocaleString() : '—';
    document.getElementById('pct-no-vehicle').textContent =
        pctNoVehicle != null ? Number(pctNoVehicle).toFixed(1) + '%' : '—';
    document.getElementById('chart-panel').style.display = 'block';
}

// load maps
map.on('load', () => {

    // Income layer
    map.addSource('income', {
        type: 'geojson',
        data: 'assets/income-seattle.geojson'
    });

    map.addLayer({
        id: 'income-fill',
        type: 'fill',
        source: 'income',
        paint: {
            'fill-color': {
                property: INCOME_FIELD,
                stops: [
                    [0,                incomeColors[0]],
                    [incomeBreaks[0],  incomeColors[1]],
                    [incomeBreaks[1],  incomeColors[2]],
                    [incomeBreaks[2],  incomeColors[3]],
                    [incomeBreaks[3],  incomeColors[4]]
                ]
            },
            'fill-opacity': 0.5
        }
    }, 'road-label-simple');

    map.addLayer({
        id: 'income-outline',
        type: 'line',
        source: 'income',
        paint: { 'line-color': '#111827', 'line-opacity': 0.2, 'line-width': 0.7 }
    }, 'road-label-simple');

    // Car ownership layer
    map.addSource('car-ownership', {
        type: 'geojson',
        data: 'assets/seattle_car_ownership.geojson'
    });

    map.addLayer({
        id: 'car-fill',
        type: 'fill',
        source: 'car-ownership',
        paint: {
            'fill-color': {
                property: CAR_FIELD,
                stops: [
                    [0,            carColors[0]],
                    [carBreaks[0], carColors[1]],
                    [carBreaks[1], carColors[2]],
                    [carBreaks[2], carColors[3]],
                    [carBreaks[3], carColors[4]]
                ]
            },
            'fill-opacity': 0.5
        }
    }, 'road-label-simple');

    // Transit stop density layer
    map.addSource('transit-tracts', {
        type: 'geojson',
        data: 'assets/census_tracts_with_transit_counts.geojson'
    });

    map.addLayer({
        id: 'tracts-fill',
        type: 'fill',
        source: 'transit-tracts',
        paint: {
            'fill-color': [
                'step', ['get', 'transit_stop_count'],
                '#f7fbff',
                17, '#c6dbef',
                24, '#6baed6',
                29, '#3182bd',
                36, '#2171b5',
                48, '#1361a9',
                65, '#0a4a8a',
                100, '#08306b'
            ],
            'fill-opacity': 0.5
        }
    }, 'road-label-simple');

    map.addLayer({
        id: 'tracts-outline',
        type: 'line',
        source: 'transit-tracts',
        layout: { visibility: 'none' },
        paint: { 'line-color': '#ffffff', 'line-width': 0.5, 'line-opacity': 0.7 }
    }, 'road-label-simple');

    map.addLayer({
        id: 'tracts-highlight',
        type: 'line',
        source: 'transit-tracts',
        paint: { 'line-color': '#f0c040', 'line-width': 2.5 },
        filter: ['==', 'GEOID20', '']
    }, 'road-label-simple');

    map.addLayer({
        id: 'income-highlight',
        type: 'line',
        source: 'income',
        paint: { 'line-color': '#f0c040', 'line-width': 2.5 },
        filter: ['==', 'GEOID', '']
    }, 'road-label-simple');

    map.addLayer({
        id: 'car-highlight',
        type: 'line',
        source: 'car-ownership',
        paint: { 'line-color': '#f0c040', 'line-width': 2.5 },
        filter: ['==', 'GEOID20', '']
    }, 'road-label-simple');

    // popups
    map.on('click', 'income-fill', function (e) {
        var incomeProps = e.features[0].properties;

        // grab data from other labels
        var carFeatures = map.queryRenderedFeatures(e.point, { layers: ['car-fill'] });
        var stopFeatures = map.queryRenderedFeatures(e.point, { layers: ['tracts-fill'] });

        var carProps = carFeatures.length ? carFeatures[0].properties : null;
        var stopProps = stopFeatures.length ? stopFeatures[0].properties : null;

        var tractName = 
            incomeProps.NAMELSAD || incomeProps.NAME || incomeProps.TRACT_NAME || 'Census Tract';

        var income = Number(incomeProps[INCOME_FIELD]);

        var incomeText = isNaN(income) 
            ? '—' 
            : '$' + income.toLocaleString();

        var rate = carProps ? Number(carProps[CAR_FIELD]) : NaN;
        var rateText = isNaN(rate) ? '—' : rate.toFixed(1) + '%';
        var count = stopProps ? stopProps.transit_stop_count : '—';

        map.setFilter('income-highlight', ['==', 'GEOID', incomeProps.GEOID || '']);
        updateKPI(count, income, isNaN(rate) ? null : rate);

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
                '<b>' + tractName + '</b><br>' +
                'Median household income: ' + incomeText + '<br>' +
                'Zero-vehicle households: ' + rateText + '<br>' +
                'Transit stops: ' + count
            )
            .addTo(map);
    });

    map.on('click', 'car-fill', function (e) {
        var carProps = e.features[0].properties;
        var incomeFeatures = map.queryRenderedFeatures(e.point, { layers: ['income-fill'] });
        var stopFeatures = map.queryRenderedFeatures(e.point, { layers: ['tracts-fill'] });
        var incomeProps = incomeFeatures.length ? incomeFeatures[0].properties : null;
        var stopProps = stopFeatures.length ? stopFeatures[0].properties : null;

        var tractName = carProps.NAMELSAD || carProps.NAME || carProps.TRACT_NAME || 'Census Tract';
        var income = incomeProps ? Number(incomeProps[INCOME_FIELD]) : NaN;
        var incomeText = isNaN(income) ? '—' : '$' + income.toLocaleString();
        var rate = Number(carProps[CAR_FIELD]);
        var rateText = isNaN(rate) ? '—' : rate.toFixed(1) + '%';
        var count = stopProps ? stopProps.transit_stop_count : '—';

        map.setFilter('car-highlight', ['==', 'GEOID20', carProps.GEOID20 || '']);
        updateKPI(count, isNaN(income) ? null : income, isNaN(rate) ? null : rate);

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
                '<b>' + tractName + '</b><br>' +
                'Median household income: ' + incomeText + '<br>' +
                'Zero-vehicle households: ' + rateText + '<br>' +
                'Transit stops: ' + count
            )
            .addTo(map);
    });

    map.on('click', 'tracts-fill', function (e) {
        var stopProps = e.features[0].properties;
        var incomeFeatures = map.queryRenderedFeatures(e.point, { layers: ['income-fill'] });
        var carFeatures = map.queryRenderedFeatures(e.point, { layers: ['car-fill'] });
        var incomeProps = incomeFeatures.length ? incomeFeatures[0].properties : null;
        var carProps = carFeatures.length ? carFeatures[0].properties : null;

        var tractName = stopProps.NAMELSAD || stopProps.NAME || stopProps.TRACT_NAME || 'Census Tract';
        var income = incomeProps ? Number(incomeProps[INCOME_FIELD]) : NaN;
        var incomeText = isNaN(income) ? '—' : '$' + income.toLocaleString();
        var rate = carProps ? Number(carProps[CAR_FIELD]) : NaN;
        var rateText = isNaN(rate) ? '—' : rate.toFixed(1) + '%';
        var count = stopProps.transit_stop_count;

        map.setFilter('tracts-highlight', ['==', 'GEOID20', stopProps.GEOID20 || '']);
        updateKPI(count, isNaN(income) ? null : income, isNaN(rate) ? null : rate);

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
                '<b>' + tractName + '</b><br>' +
                'Median household income: ' + incomeText + '<br>' +
                'Zero-vehicle households: ' + rateText + '<br>' +
                'Transit stops: ' + count
            )
            .addTo(map);
    });

    // hover cursors
    ['income-fill', 'car-fill', 'tracts-fill'].forEach(id => {
        map.on('mouseenter', id, function () { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', id, function () { map.getCanvas().style.cursor = ''; });
    });

    updateLegend();
});

// filters/checkbox
document.getElementById('toggleIncome').addEventListener('change', function () {
    ['income-fill', 'income-outline'].forEach(id => {
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', this.checked ? 'visible' : 'none');
    });

    if (!this.checked && map.getLayer('income-highlight')) {
        map.setFilter('income-highlight', ['==', 'GEOID', '']);
    }

    updateLegend();
});

document.getElementById('toggleCar').addEventListener('change', function () {
    if (map.getLayer('car-fill')) map.setLayoutProperty('car-fill', 'visibility', this.checked ? 'visible' : 'none');
    
    if (!this.checked && map.getLayer('car-highlight')) {
        map.setFilter('car-highlight', ['==', 'GEOID20', '']);
    }

    updateLegend();
});

document.getElementById('toggleStopDensity').addEventListener('change', function () {
    ['tracts-fill', 'tracts-outline', 'tracts-highlight'].forEach(id => {
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', this.checked ? 'visible' : 'none');
    });

    if (!this.checked && map.getLayer('tracts-highlight')) {
        map.setFilter('tracts-highlight', ['==', 'GEOID20', '']);
    }

    updateLegend();
});

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