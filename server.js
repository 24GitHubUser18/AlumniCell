// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // This is the middleware to parse JSON request bodies

// API Endpoint
app.post('/api/submit', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Append data to JSON file
  const filePath = path.join(__dirname, 'data.json');
  const newData = { name, email, password };

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      // File does not exist, create it
      fs.writeFile(filePath, JSON.stringify([newData], null, 2), (err) => {
        if (err) return res.status(500).json({ message: 'Error writing to file' });
        res.json({ message: 'Data saved successfully' });
      });
    } else if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    } else {
      // File exists, append to it
      const jsonData = JSON.parse(data);
      jsonData.push(newData);
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ message: 'Error writing to file' });
        res.json({ message: 'Data saved successfully' });
      });
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
