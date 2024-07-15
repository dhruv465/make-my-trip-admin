const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Hotel = require('../models/Hotel');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/hotels', async (req, res) => {
  const { hotelName, cityName, price, imageUrl } = req.body;

  try {
    // Save hotel data to MongoDB
    const hotel = new Hotel({ hotelName, cityName, price, imageUrl });
    await hotel.save();

    res.status(200).json({ message: 'Hotel added successfully' });
  } catch (error) {
    console.error('Error adding hotel:', error);
    res.status(500).json({ message: 'Error adding hotel', error });
  }
});

// Fetch all hotels
router.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find(); // Fetch all hotels
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Error fetching hotels', error });
  }
});

// Update hotel details
router.put('/hotels/:id', async (req, res) => {
  const { id } = req.params;
  const { hotelName, cityName, price, imageUrl } = req.body;

  try {
    // Find the hotel by ID and update its details
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { hotelName, cityName, price, imageUrl },
      { new: true } // Return the updated document
    );

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ message: 'Hotel details updated successfully', hotel });
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ message: 'Error updating hotel', error });
  }
});

// Add a route to delete a hotel
router.delete('/hotels/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the hotel by ID and delete it
    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Optionally, delete associated image from Cloudinary
    // const deletedImage = await cloudinary.uploader.destroy(deletedHotel.imageUrlPublicId);

    res.status(200).json({ message: 'Hotel deleted successfully', deletedHotel });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ message: 'Error deleting hotel', error });
  }
});

module.exports = router;
