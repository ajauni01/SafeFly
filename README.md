# SafeFly

SafeFly is an ongoing project that merges my passion for aviation and GIS technology. It utilizes **Esri's ArcGIS Maps SDK for JavaScript** and the **AviationStack API** to visualize real-time flight data between user-selected airports. This project is in its early stages, and I am actively pushing code as I develop new features.

## Project Overview

SafeFly allows users to input dynamic airport selections and visualizes flight paths by generating a polyline between airports in real-time. The following updates are planned for the near future:

- **User Authentication**: Will soon be integrated using **Firebase** or **Google Cloud** for personalized user experiences.
- **Dynamic Weather Data**: Real-time weather information will be added to enhance flight path insights.
- **Esri Geocoding**: To provide precise airport location selections and improve user input handling.
- **Terrain Visualization**: Future iterations will display the terrain over which the aircraft is flying, offering an immersive and informative experience.

## Technologies Used

- **SvelteKit**: The front-end framework powering SafeFly.
- **Esri's ArcGIS Maps SDK for JavaScript**: Core technology for mapping and visualizing flight paths.
- **AviationStack API**: Provides real-time flight data.
- **Firebase/Google Cloud** (upcoming): For user authentication and personalization.
- **Dynamic Weather Integration** (upcoming): Real-time weather along the flight route.
- **Esri Geocoding** (upcoming): Enhancing airport selection and precision.


## Development

To start development on SafeFly, clone the repository and run the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev -- --open
Stay tuned for frequent updates as I continue pushing new features to this project!
