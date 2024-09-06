const express = require('express');
const router = express.Router();
const Paper = require('../models/Paper');

// Save a research paper to the database
router.post('/save', async (req, res) => {
    try {
        const { title, authors, publicationYear, citations } = req.body;

        const newPaper = new Paper({
            title,
            authors,
            publicationYear,
            citations,
        });

        await newPaper.save();
        res.status(201).json({ message: 'Paper saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save the paper' });
    }
});

// Get all saved research papers
router.get('/saved', async (req, res) => {
    try {
        const papers = await Paper.find();
        res.status(200).json(papers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve saved papers' });
    }
});

// Delete a research paper by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const paperId = req.params.id;
        await Paper.findByIdAndDelete(paperId);
        res.status(200).json({ message: 'Paper deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the paper' });
    }
});

module.exports = router;
