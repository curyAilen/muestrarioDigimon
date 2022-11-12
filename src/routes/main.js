let express = require('express');
const multer = require ('multer');
const path = require ('path');
let router = express.Router();
const mainController = require('../controllers/mainController');


const storage = multer.diskStorage({
    destination: (req, file,cb)=>{
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: (req, file,cb)=>{
        console.log(file)
        const newFileName = 'Card - ' +  Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }  
});
const upload = multer({storage});

//listado productos
router.get('/', mainController.cartas);

//Crear un producto nuevo 
router.get('/altaCarta', mainController.crearCarta);
router.post('/', upload.single('imagen'), mainController.ingresaCarta);


//detalle productos
router.get('/detalleCarta/:id', mainController.detalleCarta);


//Modificar Producto
router.get('/editCarta/:id', mainController.edit);
router.post('/editCarta/:id', upload.single('imagen'),mainController.edited)

//Borrar Producto
router.delete('/:id', mainController.delete);



module.exports = router;
