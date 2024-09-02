<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    const Map = (await import('@arcgis/core/Map')).default;
    const LineSymbol3D = (await import('@arcgis/core/symbols/LineSymbol3D.js')).default;
    const Graphic = (await import('@arcgis/core/Graphic.js')).default;
    const MapView = (await import('@arcgis/core/views/MapView')).default;
    const SceneView = (await import('@arcgis/core/views/SceneView')).default;
    const GraphicsLayer = (await import('@arcgis/core/layers/GraphicsLayer.js')).default;
    const Polyline = (await import('@arcgis/core/geometry/Polyline.js')).default;
    const Extent = (await import('@arcgis/core/geometry/Extent')).default;

    // Initialize the map with a global perspective
    const map = new Map({
      basemap: "hybrid", // Globe view
      ground: "world-elevation"
    });

    const view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 0,
          
        });

    // Create a GraphicsLayer to hold the flight path
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Define the flight path from Dhaka (DAC) to New York (JFK)
    const flightPath = new Polyline({
      paths: [
        [90.4125, 23.7772, 0],  // Dhaka (DAC) - [longitude, latitude, altitude]
        [-73.7781, 40.6413, 0]  // New York (JFK) - [longitude, latitude, altitude]
      ]
    });

    // Create a Graphic to visualize the flight path
    const flightPathGraphic = new Graphic({
      geometry: flightPath,
      symbol: {
        type: "simple-line",
        color: [0, 255, 255], // Cyan color for the flight path
        width: 10,            // Adjusted width for better visibility
        style: "dash"
      }
    });

    // Add the flight path to the graphics layer
    graphicsLayer.add(flightPathGraphic);



    // Fit the view to the flight path
    const extent = new Extent({
      xmin: Math.min(90.4125, -73.7781),
      ymin: Math.min(23.7772, 40.6413),
      xmax: Math.max(90.4125, -73.7781),
      ymax: Math.max(23.7772, 40.6413),
      spatialReference: { wkid: 4326 } // WGS84
    });

    view.when(() => {
      view.goTo(extent).then(() => {
        console.debug('Map loaded with flight path from Dhaka to New York');
      });
    });
  });
</script>

<div id="viewDiv"></div>

<style>
  @import '@arcgis/core/assets/esri/themes/dark/main.css';

  #viewDiv {
    min-height: 100vh;
  }
</style>

<!-- TODO: Investigate why the graphics line is not showing -->
<!-- TODO: Show the name of the countries and name of the places when zooming in / featureLayer -->