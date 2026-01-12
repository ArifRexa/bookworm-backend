const express = require('express');
const router = express.Router();
const {
    createReview,
    getBookReviews,
    getPendingReviews,
    approveReview,
    deleteReview
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createReview);

router.get('/book/:bookId', getBookReviews);

router.get('/pending', protect, admin, getPendingReviews);

router.route('/:id')
    .delete(protect, admin, deleteReview);

router.put('/:id/approve', protect, admin, approveReview);

module.exports = router;
