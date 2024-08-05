const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log IP addresses
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const logEntry = `IP: ${ip}, Date: ${new Date().toISOString()}\n`;

  // Append the IP address to a log file
  fs.appendFile('ip-log.txt', logEntry, (err) => {
    if (err) {
      console.error('Failed to log IP address:', err);
    }
  });

  next();
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
