//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('notifications', {
        id_notification: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id_user: DataTypes.INTEGER,
        title: DataTypes.STRING,
        message: DataTypes.STRING,
        createdat: DataTypes.TIME,
        updatedat: DataTypes.TIME,
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "unread"
        },
        deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        freezeTableName: true,
        timestamps: true,
        defaultScope: {
            where: {
                deleted: false
            }
        }
    });
};

