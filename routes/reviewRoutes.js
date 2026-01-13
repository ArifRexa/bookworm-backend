const express = require('express');
const router = express.Router();
const {
    createReview,
    updateReview,
    getBookReviews,
    getAllReviews,
    approveReview,
    deleteReview
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createReview);

router.get('/book/:bookId', getBookReviews);

router.get('/admin', protect, admin, getAllReviews);

router.route('/:id')
    .put(protect, updateReview)
    .delete(protect, admin, deleteReview);

router.put('/:id/approve', protect, admin, approveReview);

module.exports = router;
