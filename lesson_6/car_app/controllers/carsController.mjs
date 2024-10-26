import { validationResult } from "express-validator";
import Car from "../models/Car.mjs";
class CarsController {
    static showCars(req, res) {
        const carsList = Car.loadCarsList()
        res.render('cars/carsList', { cars: carsList })
    }
    static createCar(req, res) {
        res.render('cars/carsForm', { car: {}, errors: {}, data: {} })
    }
    static addCar(req, res) {
        console.log('Request Body:', req.body);
        const errors = validationResult(req)
        console.log(!errors.isEmpty())
        if (!errors.isEmpty()) {
            const data = req.body
            return res.status(400).render('cars/carsForm', {
                errors: errors.array(),
                data,
                car: {}
            })
        }
        console.log('next')
        const data = req.body
        if (req.file) {
            data.carImg = req.file.filename;
        }

        Car.addCar(data)
        res.redirect('/cars')
    }
    static showCarDetails(req, res) {
        const id = req.params.id
        console.log('---------------id')
        console.log(id)
        const car = Car.getCarById(id)
        console.log(car)
        res.render('cars/carDetails', { car })
    }
    static editForm(req, res) {
        const id = req.params.id
        const car = Car.getCarById(id)
        res.render('cars/carsForm', {
            car,
            data: {},
            errors: {},
        })
    }
    static updateCar(req, res) {
        const id = req.params.id
        const car = Car.getCarById(id)
        const errors = validationResult(req)
        console.log(!errors.isEmpty())
        if (!errors.isEmpty()) {
            const data = req.body
            return res.status(400).render('cars/carsForm', {
                errors: errors.array(),
                data,
                car: car
            })
        }


        console.log('next')
        const data = req.body
        if (req.file) {
            data.carImg = `/${req.file.filename}`
        }
        Car.updateCarById(req.params.id, data)
        res.redirect('/cars')
    }
    static deleteCar(req, res) {
        Car.deleteCarById(req.body.id)
        res.send(200, 'ok')
    }

}

export default CarsController