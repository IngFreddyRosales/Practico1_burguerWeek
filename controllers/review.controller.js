const {reviews: Review} = require('../models');

exports.createReview = async (req, res) =>{
    try{
        const { id } = req.params;
        const { rating, comment } = req.body;

        await Review.create({
            rating: parseInt(rating, 10),
            comment: comment,
            burguers_id: id
        });


        res.redirect('/');
    }catch(err){
        console.error('Error al crear la reseña:', err);
        res.status(500).send('Error al crear la reseña.');
    }
}