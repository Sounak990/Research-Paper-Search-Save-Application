const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For handling CORS errors
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/paperDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Paper model
const paperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  publicationYear: { type: String, required: true },
  citations: { type: Number, required: true },
});

const Paper = mongoose.model('Paper', paperSchema);

// API Routes

// Save a paper
app.post('/api/papers/save', async (req, res) => {
  const paper = new Paper(req.body);
  try {
    await paper.save();
    res.status(201).json({ message: 'Paper saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving the paper' });
  }
});

// Fetch saved papers
app.get('/api/papers/saved', async (req, res) => {
  try {
    const savedPapers = await Paper.find(); // Fetch all saved papers
    res.status(200).json(savedPapers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching saved papers' });
  }
});

// Delete a paper
app.delete('/api/papers/delete/:id', async (req, res) => {
  try {
    await Paper.findByIdAndDelete(req.params.id); // Remove paper by ID
    res.status(200).json({ message: 'Paper deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the paper' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
