/* eslint-disable no-undef */
const { restaurants: Restaurant } = require('../models'); 
const path = require('path');

exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();

        console.log('Restaurantes obtenidos:', restaurants);

        res.render('guest/index', { restaurants });
    } catch (err) {
        console.error('Error al obtener los restaurantes:', err);
        res.status(500).send('Error al cargar la lista de restaurantes.');
    }
};

exports.showAdminPanel = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.render('admin', { restaurants });
    } catch (err) {
        console.error('Error al obtener los restaurantes:', err);
        res.status(500).send('Error al cargar el panel de administración.');
    }
}

exports.showCreateRestaurantForm = (req, res) => {
    res.render('admin/restaurant/create.ejs');
}

exports.createRestaurant = async (req, res) => {
    try {
        const { name } = req.body;
        const logo = req.files ? req.files.logo : null; 

        if (!logo) {
            return res.status(400).send('Por favor, sube una imagen para el logo.');
        }

        const restaurante = await Restaurant.create({ name });

        const imagePath = path.join(__dirname, '../public/image/restaurants', `${restaurante.id}.jpg`);

        logo.mv(imagePath, async (err) => {
            if (err) {
                console.error('Error al subir la imagen:', err);
                return res.status(500).send('Error al subir la imagen.');
            }

            restaurante.logo = `/image/restaurants/${restaurante.id}.jpg`;
            await restaurante.save();

            res.redirect('/admin');
        });
    } catch (err) {
        console.error('Error al crear el restaurante:', err);
        res.status(500).send('Error al crear el restaurante.');
    }
};

exports.showEditRestaurantForm = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).send('Restaurante no encontrado.');
        }

        res.render('admin/restaurant/edit.ejs', { restaurant });
    } catch (err) {
        console.error('Error al cargar el formulario de edición:', err);
        res.status(500).send('Error al cargar el formulario de edición.');
    }
};

exports.editRestaurant = async (req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;
        const logo = req.files ? req.files.logo : null; 

        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).send('Restaurante no encontrado.');
        }

        restaurant.name = name;

        if (logo) {
            // Definir la ruta donde se guardará la imagen
            const imagePath = path.join(__dirname, '../public/image/restaurants', `${restaurant.id}.jpg`);

            // Mover la imagen a la carpeta de destino
            logo.mv(imagePath, async (err) => {
                if (err) {
                    console.error('Error al subir la imagen:', err);
                    return res.status(500).send('Error al subir la imagen.');
                }

                // Actualizar el restaurante con la ruta de la imagen
                restaurant.logo = `/image/restaurants/${restaurant.id}.jpg`;
                await restaurant.save();

                res.redirect('/admin');
            });
        } else {
            await restaurant.save();
            res.redirect('/admin');
        }
    }catch (err) {
        console.error('Error al editar el restaurante:', err);
        res.status(500).send('Error al editar el restaurante.');
    }

};

exports.deleteRestaurant = async (req, res) => {
    try{
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).send('Restaurante no encontrado.');
        }

        await restaurant.destroy();

        res.redirect('/admin');
    }catch (err) {
        console.error('Error al eliminar el restaurante:', err);
        res.status(500).send('Error al eliminar el restaurante.');
    }
}