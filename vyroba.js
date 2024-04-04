const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Dummy array to store submitted data
let submittedData = [];

// Route to handle data submission from dashboard.vue
app.post('/api/vyroba', (req, res) => {
  const data = req.body;
  submittedData.push(data);
  console.log('Received data from dashboard.vue:', data);
  res.status(200).send('Data received successfully');
});

// Route to retrieve submitted data for checkItems.vue
app.get('/api/submitted-data', (req, res) => {
  res.json(submittedData);
});

// Route to delete item by index
app.delete('/api/submitted-data/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < submittedData.length) {
    submittedData.splice(index, 1);
    res.status(200).send('Item removed successfully');
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
