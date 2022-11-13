const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const db = require("../../database/models/");
const { validationResult } = require("express-validator");
const Op = db.Sequelize.Op;
const Usuarios = db.Usuario;

let usuarioController = {
    perfil: (req, res) => {
        res.render("perfil", { titulo: "Perfil" });
    },
    login: (req, res) => {
        console.log("Se ejecuta el login ")
        res.render("login", { titulo: "Login" });
    },

    loginprocess: (req, res) => {
        console.log("Se ejecuta el login proceso")
        let loginValidationResult = validationResult(req);
        if (!loginValidationResult.isEmpty()) {
            console.log(errores)
            return res.render("login", {                
                errores: loginValidationResult.mapped(),
                old: req.body,
            });
        }
        Usuarios.findOne({
            where: {
                nombre: req.body.nombre,
            },
        })
            .then((usuario) => {
                console.log(usuario)
                if (req.body.clave == usuario.clave) {
                    let usuarioLogeado = {
                        idUsuarios: usuario.idUsuarios,
                        nombre: usuario.nombre,
                        clave: usuario.clave
                    };
                    req.session.login = usuarioLogeado;
                    if (req.body.remember_user) {
                        res.cookie("userCookie", usuarioLogeado, {
                            maxAge: 1000 * 60 * 60 * 24,
                        });
                    }
                    return res.render("perfil");
                } else {
                    console.log("No se logueo");
                    res.render("login", {
                        error: "Clave o nombre incorrecto",
                        old: req.body
                    });
                }
            })
            .catch(() => {
                res.render("login", {
                    error: "Clave o nombre incorrecto",
                    old: req.body
                });
            });
    },
    logout: (req, res) => {
        res.clearCookie("userCookie");
        req.session.destroy();
        res.redirect("/");
    },
};

module.exports = usuarioController;
