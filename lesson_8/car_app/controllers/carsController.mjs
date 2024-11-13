
import CarsDBService from '../models/car/CarsDBService.mjs'
import DealerDBService from '../models/dealers/DealerDBService.mjs'

import { validationResult } from 'express-validator'

class CarsController {
    static async showCars(req, res) {
        try {
            const dataList = await CarsDBService.getList()
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
        const dealerList = await DealerDBService.getList()
        console.log('===============dealerList')
        console.log(dealerList)
        if (!errors.isEmpty()) {
            if (req.params.id) data.id = req.params.id
            return res.status(400).render('cars/carsForm', {
                errors: errors.array(),
                data,
                car: {},
                dealerList
            })
        }
        try {
            const { title, year, carNumber, price, carImg, dealer } = req.body

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
                await CarsDBService.create({ title, year, carNumber, price, carImg, dealer })
            }
            res.redirect('/cars')
        } catch (err) {
            res.status(500).render('cars/carsForm', {
                errors: [{ msg: err.message }],
                data,
                car: {}, dealerList
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

    static async createCar(req, res) {
        try {

            //========================================================================================================================================================
            const id = req.params.id
            let car = null
            if (id) {
                //отримати об"єкт за id
                car = await CarsDBService.getById(id)
                car.id = id
            }
            console.log(car)
            const dealerList = await DealerDBService.getList()
            res.render('cars/carsForm', {
                car, errors: {}, data: {}, dealerList
            })
            //========================================================================================================================================================

        } catch (error) {
            res.status(500).json({ error: err.message })
        }
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