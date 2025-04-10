module.exports = (sequelize, Sequelize) => {
    const Burguer = sequelize.define("burguers", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        image: {
            type: Sequelize.STRING
        },
        restaurants_id: {
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'burguers',
        timestamps: true 
    });
    return Burguer;
}