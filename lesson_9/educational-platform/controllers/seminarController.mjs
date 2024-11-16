import StudentDBService from "../models/student/StudentDBService.mjs";
import CourseDBService from "../models/course/CourseDBService.mjs";
import { validationResult } from 'express-validator'

class SeminarController {

    static async registerForm(req, res) {
        let selectedStudents
        const id = req.params.id
        try {
            let dataItem = null
            if (id) {
                dataItem = await CourseDBService.getById(id)
                dataItem.id = id
            }
            const usersList = await StudentDBService.getList()

            selectedStudents = dataItem ? dataItem.students : [];

            res.render('seminar/seminarForm', {
                data: dataItem,
                errors: [],
                options: usersList,
                selectedStudents,
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    static async register(req, res) {
        let selectedStudents, usersList
        let dataItem = null;
        try {
            const id = req.params.id
            const { topic, duration, responsibleStudent } = req.body

            const seminar = { topic, duration, responsibleStudent }
            const errors = validationResult(req)
            usersList = await StudentDBService.getList();


            if (id) {
                dataItem = await CourseDBService.getById(id);
                dataItem.id = id;
            }
            selectedStudents = dataItem ? dataItem.students : [];

            if (!errors.isEmpty()) {
                if (id) data.id = id;
                return res.status(400).render('seminar/seminarForm', {
                    errors: errors.array(),
                    data: dataItem,
                    options: usersList,
                    selectedStudents: selectedStudents || [],

                });
            }
            dataItem.seminars.push(seminar)
            await CourseDBService.update(id, dataItem)
            // Redirect to the courses page
            res.redirect('/courses');
        } catch (err) {
            // Render the form with errors
            res.status(500).render('seminar/seminarForm', {
                errors: [{ msg: err.message }],
                data: dataItem,
                options: usersList,
                selectedStudents: selectedStudents || []
            });
        }
    }
    // Метод для видалення коментаря
    static async deleteSeminar(req, res) {
        try {
            const courseId = req.params.id
            const course = await CourseDBService.getById(courseId)

            const seminarIndex = course.seminars.findIndex(seminar => seminar._id.toString() === req.body.id);
            if (seminarIndex === -1) {
                return res.status(404).json({ success: false, message: 'Seminar not found' });
            }

            course.seminars.splice(seminarIndex, 1);
            await course.save()
            res.json({ success: true })
            // res.redirect('/course')
        } catch (error) {
            throw new Error('Error deleting comment: ' + error.message)
        }
    }



}

export default SeminarController