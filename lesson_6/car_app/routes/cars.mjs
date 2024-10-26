import CarsController from '../controllers/carsController.mjs'
import CarFormValidator from '../models/carFormValidator.mjs'
import { Router } from 'express'
const router = Router()
import multer from 'multer'
import { checkSchema } from "express-validator";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + new Date().getTime() + '.png')
    }
})

const upload = multer({ storage: storage })
//---- обробка шляху '/'
router.get('/', CarsController.showCars)
router.get('/create', CarsController.createCar)
router.post('/create', upload.single('carImg'), checkSchema(CarFormValidator.schemaCarValidator), CarsController.addCar)

router.get('/edit/:id', CarsController.editForm)
router.post('/edit/:id', upload.single('carImg'), checkSchema(CarFormValidator.schemaEditCarValidator), CarsController.updateCar)


router.get('/:id', CarsController.showCarDetails)
router.delete('/', CarsController.deleteCar)

export default router
