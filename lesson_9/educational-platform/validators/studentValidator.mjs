class StudentValidator {
    static registerSchema = {
        name: {
            notEmpty: {
                errorMessage: 'Name is required',
            },
            isLength: {
                options: { min: 3 },
                errorMessage: 'Username must be at least 3 characters long',
            },
            trim: true,
            escape: true,
        },
        age: {
            isInt: {
                options: { min: 14, max: 100 },
                errorMessage: 'Age must be between 14 and 100',
            },
            toInt: true,
        },
        averageMark: {
            isInt: {
                options: { min: 1, max: 100 },
                errorMessage: 'Avarage Mark must be between 1 and 100',
            },
            toInt: true,
        },
    }
}

export default StudentValidator