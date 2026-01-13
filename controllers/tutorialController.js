const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// @desc    Get all tutorials
// @route   GET /api/tutorials
// @access  Public
const getTutorials = async (req, res) => {
    const db = getDB();
    const { category } = req.query;
    const query = category ? { category } : {};

    const tutorials = await db.collection('tutorials').find(query).toArray();
    res.json(tutorials);
};

// @desc    Create a tutorial
// @route   POST /api/tutorials
// @access  Private/Admin
const createTutorial = async (req, res) => {
    const db = getDB();
    const { title, url, category } = req.body;

    const tutorial = {
        title,
        url,
        category: category || 'Other',
        addedBy: new ObjectId(req.user._id),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const result = await db.collection('tutorials').insertOne(tutorial);
    const createdTutorial = await db.collection('tutorials').findOne({ _id: result.insertedId });
    res.status(201).json(createdTutorial);
};

// @desc    Delete a tutorial
// @route   DELETE /api/tutorials/:id
// @access  Private/Admin
const deleteTutorial = async (req, res) => {
    const db = getDB();
    const result = await db.collection('tutorials').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount > 0) {
        res.json({ message: 'Tutorial removed' });
    } else {
        res.status(404);
        throw new Error('Tutorial not found');
    }
};

module.exports = {
    getTutorials,
    createTutorial,
    deleteTutorial
};
