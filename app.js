// Librerías, módulos, variables, etc.
const express = require('express');
const app = express();
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const rutasMain = require('./src/routes/main.js');
const rutasUser = require('./src/routes/user.js');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLogged = require('./src/middlewares/userloggedMiddleware');
const methodOverride = require('method-override');


//Cokkies
app.use(session(
    {secret: 'Secreto',
    resave: false,
    saveUninitialized: false}));
    
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies());

// Configuración vista y form
app.set('view engine', 'ejs')
app.use(methodOverride('_method'));


//Middlewares globales
app.use(userLogged);

//Carpetas
app.use('/', express.static(__dirname + '/public/'));
app.use('/imagenes', express.static(__dirname + '/public/img'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))

// Rutas
app.use('/', rutasMain);
app.use('/user', rutasUser);

// Ruta de page not found (404)
app.use((req,res,next) => {

    res.status(404).render('notFound',{
        titulo: 'Not Found',
        css: 'estiloNotFound.css'
    });

});
// Levantar el server
const puerto = 3004;
app.listen(puerto, () => {
    console.log("servidor corriendo en localhost:" + puerto);
})