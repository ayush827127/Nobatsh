const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const panRoutes = require('./routes/panRoutes');
const bankRoutes = require('./routes/bankRoutes');
const gstinRoutes = require('./routes/gstinRoutes');
const cinRoutes = require('./routes/cinRoutes');
const otpRoutes = require('./routes/otpRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/pan', panRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/gstin', gstinRoutes);
app.use('/api/cin', cinRoutes);
app.use('/api/otp', otpRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/ `);
});
