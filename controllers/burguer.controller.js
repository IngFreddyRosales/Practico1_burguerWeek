/* eslint-disable no-undef */
const { burguers: Burguer, reviews: Review, sequelize} = require('../models');
const path = require('path');

exports.getBurgersByRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

const burguers = await Burguer.findAll({
    where: { restaurants_id: id },
    attributes: [
        'id', 'name', 'description', 'price', 'image', 'restaurants_id',
        [sequelize.fn('SUM', sequelize.col('reviews.rating')), 'totalRating']
    ],
    include: [
        {
            model: Review,
            as: 'reviews',
            attributes: [] 
        }
    ],
    group: ['burguers.id']
});

        console.log('Hamburguesas obtenidas:', burguers);
        console.log('Hamburguesas obtenidas:', JSON.stringify(burguers, null, 2));

        res.render('admin/burguer/burguerList', { burguers });
    } catch (err) {
        console.error('Error al obtener las hamburguesas:', err);
        res.status(500).send('Error al cargar la lista de hamburguesas.');
    }
};

exports.showCreateBurguerForm = (req, res) => {
    try{
        const {id} = req.params;
        res.render('admin/burguer/create.ejs', { id });
    }catch{
        console.error('Error al mostrar el formulario de creación de hamburguesa:');
        res.status(500).send('Error al cargar el formulario de creación de hamburguesa.');
    }
}

exports.createBurguer = async (req,res) => {
    try{
        const {id} = req.params;
        const { name, description, price } = req.body;
        const image = req.files ? req.files.image : null; 

        if(!image){
            return res.status(400).send('No se ha subido ninguna imagen.');
        }

        const burguer = await Burguer.create({
            name,
            description,
            price,
            restaurants_id: id
        });

         
        const imagePath = path.join(__dirname, '../public/image/burguers', `${burguer.id}.jpg`);
        image.mv(imagePath, async (err) =>{
            if(err){
                console.error('Error al subir la imagen' , err);
                return res.status(500).send('Error al subir la imagen')
            }

            burguer.image = `/image/burguers/${burguer.id}.jpg`;
            await burguer.save();

            res.redirect(`/admin/restaurant/${id}`);
        });
    } catch (err) {
        console.error('Error al crear la hamburguesa:', err);
        res.status(500).send('Error al crear la hamburguesa.');
    }
};

exports.deleteBurguer = async (req, res) => {
    try{
        const { id, burguerId } = req.params;
        const burguer = await Burguer.findByPk(burguerId);

        if (!burguer) {
            return res.status(404).send('Hamburguesa no encontrada.');
        }

        await burguer.destroy();

        res.redirect(`/admin/restaurant/${id}`);

    }catch{
        console.error('Error al eliminar la hamburguesa:');
        res.status(500).send('Error al eliminar la hamburguesa.');
    }
}

exports.showEditBurguerForm = async (req, res) => {
    try{
        const { id, burguerId } = req.params;
        const burguer = await Burguer.findByPk(burguerId);

        if (!burguer) {
            return res.status(404).send('Hamburguesa no encontrada.');
        }

        res.render('admin/burguer/edit.ejs', { id, burguer });
    }catch{
        console.error('Error al mostrar el formulario de edición de hamburguesa:');
        res.status(500).send('Error al cargar el formulario de edición de hamburguesa.');
    }
}

exports.editBurguer = async (req, res) => {
    try{
        const {id, burguerId} = req.params;
        const { name, description, price } = req.body;
        const image = req.files ? req.files.image : null; 

        const burguer = await Burguer.findByPk(burguerId);

        if (!burguer) {
            return res.status(404).send('Hamburguesa no encontrada.');
        }

        burguer.name = name;
        burguer.description = description;
        burguer.price = price;

        if (image) {
            // Definir la ruta donde se guardará la imagen
            const imagePath = path.join(__dirname, '../public/image/burguers', `${burguer.id}.jpg`);
            image.mv(imagePath, async (err) => {
                if (err) {
                    console.error('Error al subir la imagen:', err);
                    return res.status(500).send('Error al subir la imagen.');
                }

                burguer.image = `/image/burguers/${burguer.id}.jpg`;
                await burguer.save();

                res.redirect(`/admin/restaurant/${id}`);
            });
        } else {
            await burguer.save();
            res.redirect(`/admin/restaurant/${id}`);
        }
    }catch{
        console.error('Error al editar la hamburguesa:');
        res.status(500).send('Error al editar la hamburguesa.');
    }
}


/// for the guest 

exports.getBurgersByRestaurantToGuest = async (req, res) => {
    try{
        const {id} = req.params;
        const burguers = await Burguer.findAll({
            where: { restaurants_id: id}
        });

        console.log('Hamburguesas obtenidas:', burguers);

        res.render('guest/burguerList', { burguers });
    }catch (err){
        console.error('Error al obtener las hamburguesas:', err);
        res.status(500).send('Error al cargar la lista de hamburguesas.');
    }
}