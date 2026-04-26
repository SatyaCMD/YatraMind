const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { 
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true 
  },
  bookingId: { 
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Booking', 
     required: true 
  },
  transactionId: { 
     type: String, 
     required: true, 
     unique: true 
  },
  amount: { 
     type: Number, 
     required: true 
  },
  currency: { 
     type: String, 
     default: 'INR' 
  },
  paymentMethod: { 
     type: String, 
     enum: ['CARD', 'UPI', 'NET_BANKING', 'WALLET'],
     required: true 
  },
  paymentStatus: { 
     type: String, 
     enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'], 
     default: 'PENDING' 
  },
  ticketPdfUrl: { type: String }, // Optional stored URL if backed by cloud storage
  qrCodeData: { type: String } // Serialized string of the verification QR
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
