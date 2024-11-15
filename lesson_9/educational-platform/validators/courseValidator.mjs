class CourseValidator {
    static registerSchema = {
        title: {
            notEmpty: {
                errorMessage: 'title is required',
            },
            isLength: {
                options: { min: 3 },
                errorMessage: 'title must be at least 3 characters long',
            },
            trim: true,
            escape: true,
        },
        duration: {
            isInt: {
                options: { min: 1, max: 300 },
                errorMessage: 'duration must be between 14 and 300',
            },
            toInt: true,
        },
        students: {
            notEmpty: {
                errorMessage: 'You must select at least one student',
            },
        },
    }
}

export default CourseValidator