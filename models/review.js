module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("reviews", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: true
        },
        burguers_id: {
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'reviews',
        timestamps: true 
    });
    return Review;
}