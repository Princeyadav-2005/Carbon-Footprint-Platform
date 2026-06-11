const express = require('express');
const cors = require('cors');
require('dotenv').config();

const carbonRoutes = require('./routes/carbonRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/v1/carbon', carbonRoutes);

// Fallback Route
app.use((req, res) => res.status(404).json({ error: "Route endpoints not found." }));

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server executing securely on port ${PORT}`);
});
