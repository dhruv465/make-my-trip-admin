const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  cityName: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
