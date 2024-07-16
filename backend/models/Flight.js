const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  departureCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  classSelection: [{ type: String, enum: ['economy', 'premiumEconomy', 'business'] }],
  price: { type: Number, required: true },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
