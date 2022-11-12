module.exports = (sequelize, dataTypes) => {
    let alias = 'Cartas'; 
    let cols = {
        idCartas: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        carta: {
            type: dataTypes.STRING,
            allowNull: false, 
            validate: {min: 5}
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        }, 
        edicion:{
            type: dataTypes.STRING,
            allowNull: false
        },  
        contacto:{
            type: dataTypes.STRING,
            allowNull: false
        },  
        imagen:{
            type: dataTypes.STRING,
            allowNull: false
        },
        descripcion:{
            type: dataTypes.STRING,
            allowNull: false
        }


    };
    let config = {
        timestamps: false,
        tableName: 'cartas',
        freezeTableName:true
    }
    const Cartas = sequelize.define(alias,cols,config);

    return Cartas
};