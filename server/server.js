const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only React front-end to make requests
    optionsSuccessStatus: 200        // For legacy browser support
  };
  
app.use(cors(corsOptions)); // Use CORS middleware with options
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies

// Simple route for checking server status
app.get('/', (req, res) => {
    res.send('Server is running');
  });

// Array to store webhook events locally
let webhookEvents = [];

// Example POST route for webhook
app.post('/webhook', (req, res) => {
    console.log(req.body); // Log the webhook data
    webhookEvents.push(req.body); // Store webhook data
    res.status(200).send('Webhook received');
});

// Route to get stored webhook data
app.get('/api/data', (req, res) => {
    res.json(webhookEvents); // Send stored webhook data as JSON
});

const PORT = 3001; // Setted a port different from React Application in local envirnoment
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
