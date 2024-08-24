<script>
  import { onMount } from 'svelte';

  let flightPaths = [];
  
  onMount(async () => {
    const response = await fetch('/api/flightPaths');
    flightPaths = await response.json();


      const Map = (await import('@arcgis/core/Map')).default;
      const Graphic = (await import('@arcgis/core/Graphic')).default;
      const MapView = (await import('@arcgis/core/views/MapView')).default;
      const SceneView = (await import('@arcgis/core/views/SceneView')).default;
      const GraphicsLayer = (await import('@arcgis/core/layers/GraphicsLayer.js')).default;
      const PolyLine = (await import('@arcgis/core/geometry/Polyline.js')).default;

      const map = new Map({
          basemap: "streets-night-vector",
          ground: "world-elevation"
        });

        const view = new SceneView({
          container: "viewDiv",
          map: map,
          camera: {
            position: {
              x: -73.7781, 
              y: 40.6413,  
              z: 15000     
            },
            tilt: 45
          }
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);


        // flightPaths.forEach(path => {
        //   const polyline = new PolyLine({paths: path.path})
        // });


        // const flightPathGraphic = new Graphic({
        //     geometry: PolyLine,
        //     symbol: {
        //       type: "simple-line",
        //       color: [0, 255, 255],
        //       width: 2,
        //       style: "dash"
        //     }
        //   });
        //   GraphicsLayer.add(flightPathGraphic);

      view.when(() => {
          console.debug('Map loaded');
      });
  });
</script>

<div id="viewDiv"  />

<style>
  @import '@arcgis/core/assets/esri/themes/dark/main.css';
  
  #viewDiv {
      min-height: 100vh;
  }
</style>



<!-- TODO: Install tailwind -->
<!-- TODO: Fix the folder structure -->
<!-- TODO: Create a GitHub repository and commit codes-->
<!-- TODO: Check if the data is saved in MongoDB or fix data saving issue in MongoDB -->
