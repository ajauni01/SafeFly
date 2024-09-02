<script>
  import { onMount } from 'svelte';
  import { flightData } from '$lib/index.js';

  let flights = [];

  async function fetchFlightData() {
    const data = await flightData();
    flights = data?.flights?.data; // Store the flight data
    console.log('Flight data fetched:', flights);
  }

  onMount(async () => {
    await fetchFlightData();
    const Map = (await import('@arcgis/core/Map')).default;
    const Graphic = (await import('@arcgis/core/Graphic.js')).default;
    const MapView = (await import('@arcgis/core/views/MapView')).default;
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
      },

      popupTemplate: {
         title: "🚀 Jetting from JFK to DAC: No Direct Flight? No Problem! We'll Stop by Doha!",
        content: (feature) => {
          if (flights.length === 0) {
            return "<p>No flight data available. Please try again later.</p>";
          }

          let content = '<h4>Available Flights:</h4><ul>';
          
          // Add flight details for each flight
          flights.forEach(flight => {
            content += `
              <li>
                <strong>Flight:</strong> ${flight.flight.iata} (${flight.airline.name})<br>
                <strong>Departure:</strong> ${flight.departure.airport} - ${new Date(flight.departure.scheduled).toLocaleString()}<br>
                <strong>Arrival:</strong> ${flight.arrival.airport} - ${new Date(flight.arrival.scheduled).toLocaleString()}<br>
              </li>
            `;
          });

          content += '</ul>';
          return content;
        }
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
