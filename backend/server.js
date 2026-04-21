const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const incidentRoutes = require('./routes/incidents');
app.use('/api/incidents', incidentRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Rapid Crisis Response API is running' });
});

// Start server
app.listen(port, () => {
    console.log(`Command Center Backend running on http://localhost:${port}`);
});
