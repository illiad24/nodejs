import mongoose from "mongoose";

const { Schema } = mongoose
const seminarSchema = new Schema({
    topic: {
        type: String,
        required: [true, 'Topic is required'],
        minlength: [3, 'Topic must be at least 3 characters long'],
        maxlength: [100, 'Topic must be at most 100 characters long'],
        trim: true,
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1 hour'],
        max: [1000, 'Duration must be at most 1000 hours'],
    },

    responsibleStudent: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },

})
const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [100, 'Name must be at most 100 characters long'],
        trim: true,
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1 hour'],
        max: [1000, 'Duration must be at most 1000 hours'],
    },

    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
    ],
    seminars: [seminarSchema]

})
const Course = mongoose.model('Course', courseSchema)
export default Course