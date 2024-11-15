import StudentDBService from "../models/student/StudentDBService.mjs";
import CourseDBService from "../models/course/CourseDBService.mjs";
import { validationResult } from 'express-validator'

class SeminarController {

    static async registerForm(req, res) {
        let selectedStudents
        try {
            const id = req.params.id
            let dataItem = null
            if (id) {
                dataItem = await CourseDBService.getById(id)
                dataItem.id = id
            }
            const usersList = await StudentDBService.getList()
            console.log(usersList)
            selectedStudents = dataItem ? dataItem.students : [];

            res.render('seminar/seminarForm', {
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
        const data = req.body;

        let selectedStudents, usersList
        try {
            const id = req.params.id
            const { topic, duration, students } = req.body

            const seminar = { topic, duration, students }
            const errors = validationResult(req)
            usersList = await StudentDBService.getList();
            console.log(usersList)
            let dataItem = null;
            if (id) {
                dataItem = await CourseDBService.getById(id);
                dataItem.id = id;
            }
            selectedStudents = dataItem ? dataItem.students : [];

            if (!errors.isEmpty()) {
                if (id) data.id = id;
                return res.status(400).render('seminar/seminarForm', {
                    errors: errors.array(),
                    data,
                    options: usersList,
                    selectedStudents: selectedStudents || []
                });
            }
            dataItem.seminars.push(seminar)
            dataItem.seminars
            await CourseDBService.update(id, dataItem)
            // Redirect to the courses page
            res.redirect('/courses');
        } catch (err) {
            // Render the form with errors
            res.status(500).render('seminar/seminarForm', {
                errors: [{ msg: err.message }],
                data,
                options: usersList,
                selectedStudents: selectedStudents || []
            });
        }
    }

}

export default SeminarController