import mongoose from 'mongoose';

const flightPathSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  path: {
    type: [[Number]],
    required: true,
  },
  date: { type: Date, default: Date.now }
});

export default mongoose.models.FlightPath || mongoose.model('FlightPath', flightPathSchema);
