const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const hotelRoutes = require('./routes/hotelRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors()); // Use cors middleware before defining routes
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});


// Use routes
app.use('/api', hotelRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
