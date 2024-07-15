const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const hotelRoutes = require('./routes/hotelRoutes');
const flightRoutes = require('./routes/flightRoutes'); // Import flightRoutes

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api/hotels', hotelRoutes); // Use hotelRoutes under /api/hotels
app.use('/api/flights', flightRoutes); // Use flightRoutes under /api/flights

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
