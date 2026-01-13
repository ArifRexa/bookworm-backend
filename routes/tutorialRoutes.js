const express = require('express');
const router = express.Router();
const {
    getTutorials,
    createTutorial,
    deleteTutorial
} = require('../controllers/tutorialController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getTutorials).post(protect, admin, createTutorial);
router.route('/:id').delete(protect, admin, deleteTutorial);

module.exports = router;
