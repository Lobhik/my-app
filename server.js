const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // Replace with your desired port number

// Enable CORS for all routes
app.use(cors());

// Define a sample route
app.get('/api/sample', (req, res) => {
  res.json({ message: 'Hello, CORS is enabled on this route!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
