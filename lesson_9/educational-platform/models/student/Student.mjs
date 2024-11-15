// name age average mark

import mongoose from "mongoose";

const { Schema } = mongoose
const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long'],
        trim: true,
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [14, 'Age must be at least 14'],
        max: [65, 'Age must be at most 65'],
        toInt: true,
    },
    averageMark: {
        type: Number,
        required: [true, 'Average Mark is required'],
        min: [1, 'Average Mark must be at least 1'],
        max: [100, 'Age must be at most 100'],
        toInt: true,
    },
})
const Student = mongoose.model('Student', studentSchema)
export default Student