// Librerías, módulos, variables, etc.
const express = require('express');
const app = express();

const rutasMain = require('./src/routes/main.js');
const methodOverride = require('method-override');


// Configuración vista y form
app.set('view engine', 'ejs')
app.use(methodOverride('_method'));
//Carpetas
app.use('/', express.static(__dirname + '/public/'));
app.use('/imagenes', express.static(__dirname + '/public/img'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))

// Rutas
app.use('/', rutasMain);

// Ruta de page not found (404)
app.use((req,res,next) => {

    res.status(404).render('notFound',{
        titulo: 'Not Found',
        css: 'estiloNotFound.css'
    });

});
// Levantar el server
const puerto = 3000;
app.listen(puerto, () => {
    console.log("servidor corriendo en localhost:" + puerto);
})