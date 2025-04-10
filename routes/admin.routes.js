const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller')
const burguerController = require('../controllers/burguer.controller')

router.get('/', restaurantController.showAdminPanel);

router.get('/restaurant/create',restaurantController.showCreateRestaurantForm)
router.post('/create', restaurantController.createRestaurant)

router.get('/edit/:id', restaurantController.showEditRestaurantForm)
router.post('/restaurant/edit/:id', restaurantController.editRestaurant)

router.post('/restaurant/delete/:id', restaurantController.deleteRestaurant);

// Rutas para los burguers

router.get('/restaurant/:id', burguerController.getBurgersByRestaurant);

router.get('/restaurant/:id/create', burguerController.showCreateBurguerForm);
router.post('/restaurant/:id/create', burguerController.createBurguer);

router.get('/restaurant/:id/burguer/edit/:burguerId', burguerController.showEditBurguerForm);
router.post('/restaurant/:id/burguer/edit/:burguerId', burguerController.editBurguer);

router.post('/restaurant/:id/burguer/delete/:burguerId', burguerController.deleteBurguer);

module.exports = router;
