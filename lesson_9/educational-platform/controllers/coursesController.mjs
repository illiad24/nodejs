import { validationResult } from "express-validator";
import CourseDBService from "../models/course/CourseDBService.mjs";
import StudentDBService from "../models/student/StudentDBService.mjs";
import Student from "../models/student/Student.mjs";
import mongoose from "mongoose";

class CourseController {
    static async courceList(req, res) {
        try {
            const dataList = await CourseDBService.getList()

            res.render('courses/courseList', {
                courses: dataList,
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
                dataItem = await CourseDBService.getById(id)
                dataItem.id = id
            }
            const usersList = await StudentDBService.getList({})
            const selectedStudents = dataItem ? dataItem.students : [];
            console.log(dataItem)
            res.render('courses/courseForm', {
                data: dataItem,
                errors: [],
                options: usersList,
                selectedStudents
            })
        } catch (err) {
            console.error(err.message);
        }
    }
    static async register(req, res) {
        const errors = validationResult(req)
        const data = req.body
        console.log(data)
        const id = req.params.id
        let dataItem = null
        if (id) {
            dataItem = await CourseDBService.getById(id)
            dataItem.id = id
        }
        const selectedStudents = dataItem ? dataItem.students : [];
        const usersList = await StudentDBService.getList({})
        if (!errors.isEmpty()) {
            if (id) data.id = id
            return res.status(400).render('courses/courseForm', {
                errors: errors.array(),
                data,
                options: usersList,
                selectedStudents: selectedStudents ? selectedStudents : []
            })
        }
        try {
            if (id) {
                data.id = id
                await CourseDBService.update(id, data)
            } else {
                // Додаємо користувача в базу даних
                await CourseDBService.create(data)
            }
            res.redirect('/courses')
        } catch (err) {
            res.status(500).render('courses/courseForm', {
                errors: [{ msg: err.message }],
                data,
                options: usersList,
                selectedStudents: selectedStudents ? selectedStudents : []
            })
        }
    }
    static deleteCource(req, res) {
        const id = req.body.id;
        try {
            console.log(`Deleting course with ID: ${id}`); // Перевірка ID на сервері
            CourseDBService.deleteById(id)
            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    static async courseInfo(req, res) {
        try {
            const course = await CourseDBService.getById(req.params.id)
            const students = await Student.find({
                '_id': { $in: course.students }  // Знайти студентів, чиї ID є в масиві students
            });
            course.students = students
            console.log(students)
            res.render('courses/courseInfo', {
                course,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }



}

export default CourseController