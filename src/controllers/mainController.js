const db = require("../../database/models");
const Op = db.Sequelize.Op;
const path = require("path");
const cartas = db.Cartas;


let mainController = {
    cartas: (req, res) => {
        cartas.findAll()
        .then((cartas)=>{
            res.render('inicio', {titulo: 'HOME', cartas: cartas})
        })
        
    },
    detalleCarta: (req, res) => {
        let id = req.params.id;
        cartas.findByPk(id)
            .then((carta) => {
                res.render("./detalleCarta", {
                    titulo: "Detalle de la carta",
                    carta: carta,
                });
            })
            .catch(() => {
                res.render("notFound", {
                    titulo: "No existe la carta",
                    id: req.params.id,
                });
            });
    },    
    crearCarta: (req, res) => {      
            res.render("altaCarta", {
                titulo: "Ingresar nueva carta",           
            });
    },
    ingresaCarta: (req, res) => {   
            cartas.create({
                carta: req.body.nombre,
                precio: req.body.precio,
                stock: req.body.stock,
                edicion: req.body.edicion,
                contacto: req.body.contacto,
                imagen: req.file.filename,
                descripcion: req.body.descripcion,                            
            }).then(() => {
                res.redirect("/");
            })
    },
    edit: (req, res) => {
        cartas.findByPk(req.params.id)
            .then((carta) => {
                    res.render("./editCarta", {
                        titulo: "Formulario de modificación",
                        carta: carta,
                    });
            });
    },
    edited: (req, res) => {
        let imagen = req.body.imagenOriginal;

        if (req.file) {
            imagen = req.file.filename;
    }
        cartas.update(
            {
                carta: req.body.nombre,
                precio: req.body.precio,
                stock: req.body.stock,
                contacto: req.body.contacto,
                imagen: imagen,
                descripcion: req.body.descripcion,
            },
            {
                where: {
                    idCartas: req.params.id,
                },
            })
            .then((carta)=>{
                console.log(carta)
                res.redirect("/detalleCarta/:id");
                
            })   
    },
    delete: (req, res) => {
        cartas.destroy({
            where: { idCartas: req.params.id },
        });

        res.redirect("/");
    },

}

module.exports = mainController;