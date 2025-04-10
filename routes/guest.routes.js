const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');
const burguerController = require('../controllers/burguer.controller');
const reviewController = require('../controllers/review.controller');


router.get('/', restaurantController.getRestaurants);

router.get('/restaurant/:id', burguerController.getBurgersByRestaurantToGuest);
router.post('/restaurant/:id/review', reviewController.createReview);  

module.exports = router;