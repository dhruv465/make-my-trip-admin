const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// Create a new flight
router.post('/flights', async (req, res) => {
    const { departureCity, destinationCity, departureDate, returnDate, classSelection } = req.body;

    try {
        // Save flight data to MongoDB
        const flight = new Flight({ departureCity, destinationCity, departureDate, returnDate, classSelection });
        await flight.save();

        res.status(200).json({ message: 'Flight added successfully' });
    } catch (error) {
        console.error('Error adding flight:', error);
        res.status(500).json({ message: 'Error adding flight', error });
    }
});

// Fetch all flights
router.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find(); // Fetch all flights
        res.status(200).json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ message: 'Error fetching flights', error });
    }
});

// Update flight details
router.put('/flights/:id', async (req, res) => {
    const { id } = req.params;
    const { departureCity, destinationCity, departureDate, returnDate, classSelection } = req.body;

    try {
        // Find the flight by ID and update its details
        const flight = await Flight.findByIdAndUpdate(
            id,
            { departureCity, destinationCity, departureDate, returnDate, classSelection },
            { new: true } // Return the updated document
        );

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        res.status(200).json({ message: 'Flight details updated successfully', flight });
    } catch (error) {
        console.error('Error updating flight:', error);
        res.status(500).json({ message: 'Error updating flight', error });
    }
});

// Delete a flight  
router.delete('/flights/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the flight by ID and delete it
        const deletedFlight = await Flight.findByIdAndDelete(id);

        if (!deletedFlight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        res.status(200).json({ message: 'Flight deleted successfully', deletedFlight });
    } catch (error) {
        console.error('Error deleting flight:', error);
        res.status(500).json({ message: 'Error deleting flight', error });
    }
});

module.exports = router;
