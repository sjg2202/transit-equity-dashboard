# Seattle Transit Equity Dashboard (Draft)

Map projection, map zoom levels, center: Projection will be EPSG: 3857. Our map will be centered on Seattle at longitude -122.3321, latitude 47.6062. Likewise, the initial zoom level of our map will be approximately 11.

Description of the base map we plan to use: 
A Mapbox light/minimalist base style (light-v11) to keep demographic and transit layers visually prominent without competing with background detail.

Description of the thematic layers we will make:
Layer 1: Transit Stop Density by Census Tract Used visual strategies: Choropleth map using a sequential color palette to show variation in transit stop density across Seattle census tracts. Supporting data sets for each thematic map layer: 2020 Seattle Census Tract Boundaries GeoJSON loaded as a polygon layer and King County Metro Stop GeoJSON loaded as a point layer, both added directly as sources in Mapbox GL JS within index.html. Vector or raster layer. If it is a vector, which data attribute to use? If raster, which zoom level and presumed bounding box to use: Vector layer. The census tract boundaries use the GeoID attribute to identify each tract, while the transit stop points use their coordinate geometry to determine which tract they fall within.

Layer 2: Median Household Income by Census Tract Used visual strategies: We will use the Choropleth Map where color intensity represents income levels. This will be classified as Natural Breaks (Jenks) to best highlight the economic disparity between neighborhoods. 

Supporting data sets for each thematic map layer: ACS 2024 5-Year Estimates (Median Household Income in the Past 12 Months). The base geography layer will be pulled from the Tiger/Line 2024 Census Tract Shapefiles (Filtered to King County, FIPS 033). Vector or raster layer. If it is a vector, which data attribute to use? If raster, which zoom level and presumed bounding box to use: This layer will use a Vector layer, GeoJSON/Shapefile format, B19013_001E (Estimated Median Household Income) data attribute to showcase color ramp for each census tract. Seattle neighborhood boundaries were obtained from the City of Seattle Neighborhood Map Atlas dataset and used to clip King County census tracts to the Seattle study area.

Layer 3: Car Ownership Rate by Census Tract Used visual strategies: We will use the Choropleth map to represent the density of transit-dependent households. Darker color saturation will represent areas with higher percentages of zero-vehicle households. Supporting data sets for each thematic map layer: ACS 2024 5-Year Estimate (Household Size by Vehicles Available), specifically the "Zero Vehicle households" to determine transit necessity. Vector or raster layer. If it is a vector, which data attribute to use? If raster, which zoom level and presumed bounding box to use: We will use a Vector layer, specifically the GeoJSON format for Mapbox compatibility. Focusing on "Zero vehicle households; Pct_No_Vehicle", the percentage of households with zero vehicles available per tract, ensuring an accurate comparison across different population densities.

Proposed interactive functions: Layer toggle controls that allow users to turn individual thematic layers on and off, including income, car ownership, stop density, and individual transit stops. Click-to-inspect popups on census tracts that display tract-specific metrics such as stop density, median household income, percent of households without a car, and a transit desert classification. A dropdown filter to display transit stop markers by type, such as bus only or light rail only. A range slider to filter which census tracts are displayed based on median household income. A legend panel for each active choropleth layer explaining the color ramp and value ranges. An about panel explaining the project purpose, data sources, and defining what a transit desert is.

How to arrange all the components on the graphical user interface (GUI)?
For the organization of the interface we will have a side bar that will include the filters and legend for the map with the choropleth map that we have highlighted for our project for our second page. For our second page there will be a way where you can navigate to the first page where it will be completely be used to look at what our project is about and the 3rd page to navigate to another map to look at a zoom version of the 3rd page map where it will give further detailed information of the variables that are shown on the pop up 

What are the coordinated charts you plan to make?
Javascript that supports the making of a chart:
The javascript will have to be used for making the charts in the [c3 min js](https://c3js.org/) to be able to make the chosen chart and also d3.js to be able to help customize the chart.
Type of chart (e.g., line, bar, pie, etc.): 
The chart for our project we want to do is a bar chart with the help of 2 js files to be able show the differences of commute times. 
Data attributes to be visualized:
The attributes to be visualized in the map are the tract name, income, car ownership, stop density, mode of transportation.
