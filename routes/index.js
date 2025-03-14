const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const { getDb } = require('../data/database'); // Import getDb

router.get('/testdb', async (req, res) => {
    try {
        const db = getDb();
        // Try to find a document in a collection (replace 'your_collection' with your collection name)
        const result = await db.collection('contacts').findOne({});

        if (result) {
            res.json({ message: 'Database connection successful', result });
        } else {
            res.json({ message: 'Database connection successful, but no data found' });
        }
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getSingle);

module.exports = router;