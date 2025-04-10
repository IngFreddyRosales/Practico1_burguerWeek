const dbconfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host: dbconfig.HOST,
        port: dbconfig.PORT,
        dialect: 'mysql',

    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.burguers = require('./burguer.js')(sequelize, Sequelize);
db.restaurants = require('./restaurant.js')(sequelize, Sequelize);
db.reviews = require('./review.js')(sequelize, Sequelize);

db.restaurants.hasMany(db.burguers, { foreignKey: 'restaurants_id', as: 'burguers' });
db.burguers.belongsTo(db.restaurants, {
    foreignKey: 'restaurants_id',
    as: 'restaurants'
});

db.burguers.hasMany(db.reviews, { foreignKey: 'burguers_id', as: 'reviews' });
db.reviews.belongsTo(db.burguers, {
    foreignKey: 'burguers_id',
    as: 'burguers'
});

module.exports = db;
