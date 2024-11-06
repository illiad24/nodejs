
import CarsDBService from '../models/car/CarsDBService.mjs'

import { validationResult } from 'express-validator'

class CarsController {
    static async showCars(req, res) {
        try {
            const dataList = await CarsDBService.getList()
            console.log(dataList)
            res.render('cars/carsList', {
                cars: dataList,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async showCarDetails(req, res) {
        try {
            const id = req.params.id

            const car = await CarsDBService.getById(id)

            res.render('cars/carDetails', { car })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async addCar(req, res) {
        // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
        const errors = validationResult(req)
        const data = req.body
        if (req.file) {
            data.carImg = req.file.filename;
        }
        if (!errors.isEmpty()) {
            if (req.params.id) data.id = req.params.id
            return res.status(400).render('cars/carsForm', {
                errors: errors.array(),
                data,
                car: {}
            })
        }
        try {
            const { title, year, carNumber, price, carImg } = req.body

            if (req.params.id) {
                // Оновлюємо дані про користувача в базі даних
                await CarsDBService.update(req.params.id, {
                    title,
                    year,
                    carNumber,
                    price,
                    carImg
                })
            } else {
                // Додаємо користувача в базу даних
                await CarsDBService.create({ title, year, carNumber, price, carImg })
            }
            res.redirect('/cars')
        } catch (err) {
            res.status(500).render('cars/carsForm', {
                errors: [{ msg: err.message }],
                data,
                car: {}
            })
        }
    }
    static async deleteCar(req, res) {
        try {
            await CarsDBService.deleteById(req.body.id)
            res.json({ success: true })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to delete user' })
        }
    }

    //========================================================================================================================================================

    static createCar(req, res) {
        res.render('cars/carsForm', { car: {}, errors: {}, data: {} })
    }

    static editForm(req, res) {
        const id = req.params.id
        const car = CarsDBService.getById(id)
        car.id = id
        res.render('cars/carsForm', {
            car,
            data: {},
            errors: {},
        })
    }

    static updateCar(req, res) {
        const id = req.params.id
        const car = CarsDBService.getById(id)
        if (id) car.id = req.params.id
        const data = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            return res.status(400).render('cars/carsForm', {
                errors: errors.array(),
                data,
                car: car
            })
        }
        if (req.file) {
            data.carImg = `/${req.file.filename}`
        }
        try {
            CarsDBService.update(req.params.id, data)
        } catch (err) {
            res.status(500).render('cars/carsForm', {
                errors: [{ msg: err.message }],
                data,
                car: {}
            })
        }

        res.redirect('/cars')
        location.reload();
    }
}
export default CarsController