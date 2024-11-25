import UsersDBService from '../models/user/UsersDBService.mjs'
import TypesDBService from '../models/type/TypesDBService.mjs'
import { validationResult } from 'express-validator'

class UserController {
    static async usersList(req, res) {
        try {
            const filters = {}
            for (const key in req.query) {
                if (req.query[key]) filters[key] = req.query[key]
            }

            const dataList = await UsersDBService.getList(filters)
            res.status(200).json({
                users: dataList,
                user: req.user,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async registerForm(req, res) {
        try {
            const id = req.params.id
            let user = null
            if (id) {
                user = await UsersDBService.getById(id)
            }
            const types = await TypesDBService.getList()

            res.status(200).json({
                errors: [],
                data: user,
                types,
                user: req.user,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async registerUser(req, res) {
        const errors = validationResult(req)
        const data = req.body
        console.log(1)
        console.log(data)
        if (!errors.isEmpty()) {
            console.log('error')
            if (req.params.id) data.id = req.params.id
            return res.status(400).json({
                errors: errors.array(),
                data,
                user: req.user,
            })
        }
        try {
            const dataObj = req.body
            console.log(dataObj)
            if (req.file) dataObj.img = req.file.filename
            if (req.params.id) {
                await UsersDBService.update(req.params.id, dataObj)
            } else {
                await UsersDBService.create(dataObj)
            }

            res.status(200).json({ message: 'User registered successfully' })
        } catch (err) {
            res.status(500).json({
                errors: [{ msg: err.message }],
                data,
                types,
                user: req.user,
            })
        }
    }

    static async deleteUser(req, res) {
        try {
            await UsersDBService.deleteById(req.body.id)
            res.status(200).json({ success: true })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to delete user' })
        }
    }
    static async getUserById(req, res) {
        if (!req.user) {
            return res.status(403).json({ success: false, errors: "Access denied" })
        }
        const id = req.params.id
        try {
            const user = await UsersDBService.getById(id)
            res.json({ success: true, data: user, user: req.user })
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message })
        }
    }
}

export default UserController
