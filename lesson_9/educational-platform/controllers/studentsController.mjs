import StudentDBService from "../models/student/StudentDBService.mjs";
import { validationResult } from 'express-validator'
class StudentController {
    static async studentList(req, res) {
        try {
            const dataList = await StudentDBService.getList()
            console.log(dataList)
            res.render('students/studentsList', {
                students: dataList,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async studentInfo(req, res) {
        try {
            const student = await StudentDBService.getById(req.params.id)
            res.render('students/studentInfo', {
                student,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async registerForm(req, res) {
        try {
            const id = req.params.id
            let dataItem = null
            if (id) {
                dataItem = await StudentDBService.getById(id)
                dataItem.id = id
            }
            res.render('students/studentForm', {
                data: dataItem,
                errors: []
            })
        } catch (err) {
            console.error(err.message);
        }
    }
    static async register(req, res) {
        // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
        const errors = validationResult(req)
        const data = req.body
        if (!errors.isEmpty()) {
            if (req.params.id) data.id = req.params.id
            return res.status(400).render('students/studentForm', {
                errors: errors.array(),
                data,
            })
        }
        try {
            if (req.params.id) {
                data.id = req.params.id
                await StudentDBService.update(req.params.id, data)
            } else {
                // Додаємо користувача в базу даних
                await StudentDBService.create(data)
            }
            res.redirect('/students')
        } catch (err) {
            res.status(500).render('students/studentForm', {
                errors: [{ msg: err.message }],
                data,
            })
        }
    }
    static studentDelete(req, res) {
        const id = req.body.id;
        try {
            console.log(`Deleting student with ID: ${id}`); // Перевірка ID на сервері
            StudentDBService.deleteById(id)
            // res.redirect('/students')
            // res.json({ success: true })
            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default StudentController