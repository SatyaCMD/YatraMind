const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { 
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true 
  },
  serviceType: { 
     type: String, 
     enum: ['FLIGHT', 'TRAIN', 'BUS', 'CAB', 'HOTEL', 'VILLA', 'PACKAGE', 'FOREX', 'INSURANCE'], 
     required: true 
  },
  bookingReference: { 
     type: String, 
     required: true, 
     unique: true 
  }, // e.g. PNR or Booking ID
  origin: { type: String },
  destination: { type: String },
  travelDates: {
     start: { type: Date },
     end: { type: Date }
  },
  passengers: [{
     name: { type: String },
     age: { type: Number },
     seatNumber: { type: String }
  }],
  status: { 
     type: String, 
     enum: ['PENDING', 'CONFIRMED', 'CANCELLED'], 
     default: 'PENDING' 
  },
  totalAmount: { type: Number, required: true },
  itinerarySummary: { type: String } // Quick frontend display string
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
