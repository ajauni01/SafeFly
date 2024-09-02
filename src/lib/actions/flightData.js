import axios from 'axios';

// Define the API endpoint URL for real-time flights
const API_URL = 'https://api.aviationstack.com/v1/flights';

export async function flightData() {
  const apiKey = import.meta.env.VITE_API_KEY; // Ensure this is correctly set

  try {
    // Fetch real-time flight data from JFK to Dhaka
    const response = await axios.get(API_URL, {
      params: {
        access_key: apiKey,
       limit: 2,
        dep_iata: 'JFK', // Departure IATA code for JFK
        arr_iata: 'DOH', // Arrival IATA code for Dhaka
        
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      flights: response.data
    };
  } catch (error) {
    console.error('Error fetching flight data:', error.response ? error.response.data : error.message);
    
    // Throw the error so SvelteKit can handle it appropriately
    throw error;
  }
}
