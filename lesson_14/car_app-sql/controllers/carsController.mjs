
import CarsDBService from '../models/CarsDBService.mjs'

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
            console.log('---------------id')
            console.log(id)
            const car = await CarsDBService.getById(id)
            console.log(car)
            res.render('cars/carDetails', { car })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async addCar(req, res) {
        // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
        const errors = validationResult(req)
        const data = req.body
        console.log(req.file);
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
            console.log('====>>> req.body')
            console.log({ title, year, carNumber, price, carImg })
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
            console.log(3)
            res.status(500).render('cars/carsForm', {
                errors: [{ msg: err.message }],
                data,
                car: {}
            })
        }
    }
    static async deleteCar(req, res) {
        try {
            console.log(req.body.id)
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
        console.log('---------------id')
        console.log(id)
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
        CarsDBService.update(req.params.id, data)
        res.redirect('/cars')
        location.reload();

    }
}
export default CarsController