module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario'; 
    let cols = {
        idUsuarios: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false, 
            validate: {min: 5}
        },
        clave: {
            type: dataTypes.STRING,
            allowNull: false
        }

    };
    let config = {
        timestamps: false,
        tableName: 'usuarios',
        freezeTableName:true
    }
    const Usuario = sequelize.define(alias,cols,config);

    return Usuario
};