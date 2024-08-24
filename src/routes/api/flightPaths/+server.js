import connectDB from '$lib/db';
import FlightPath from '$lib/models/FlightPath';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    await connectDB();
    const testPath = new FlightPath({ origin: "Test", destination: "Test", path: [[0, 0], [1, 1]] });
    await testPath.save();
    return json({
        status: 200,
        body: "Database connection successful and test data saved!"
      });
  } catch (err) {
    return json({
        status: 500,
        body: "Database connection failed!"
      });
  }
}
