"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const reviews = [];
router.get('/', (_req, res) => {
    return res.json({
        success: true,
        reviews,
    });
});
router.get('/:productId', (req, res) => {
    const productReviews = reviews.filter((review) => review.productId === req.params.productId);
    return res.json({
        success: true,
        reviews: productReviews,
    });
});
router.post('/', (req, res) => {
    const { productId, author, rating, comment, verified } = req.body;
    if (!productId || !author || !comment || typeof rating !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'productId, author, rating, and comment are required',
        });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            success: false,
            message: 'Rating must be between 1 and 5',
        });
    }
    const newReview = {
        id: Date.now().toString(),
        productId,
        author,
        rating,
        comment,
        date: new Date().toISOString(),
        verified: Boolean(verified),
    };
    reviews.unshift(newReview);
    return res.status(201).json({
        success: true,
        message: 'Review added successfully',
        review: newReview,
    });
});
router.delete('/:id', (req, res) => {
    const index = reviews.findIndex((review) => review.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Review not found',
        });
    }
    const deletedReview = reviews.splice(index, 1)[0];
    return res.json({
        success: true,
        message: 'Review deleted successfully',
        review: deletedReview,
    });
});
exports.default = router;
//# sourceMappingURL=reviews.js.map