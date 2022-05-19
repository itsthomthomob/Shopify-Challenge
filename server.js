// Author: Thomas O'Brien
// Purpose: Initialize node.js for the frontend server
// 
// Modification Log
// 
// 05-17: server.js created
// 05-19: Changed port to 3001
// 

// Connect to react frontend
const express = require("express");
const app = express();
const PORT = 3001;
const router = express.Router();

// Use the public directory
app.use(express.static('public'));

// Handle POST data as JSON objects
router.use(express.json());

// API routes
router.use('/api/AIManager', require('./api/AIManager'));
app.use(router);

// Test server port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});