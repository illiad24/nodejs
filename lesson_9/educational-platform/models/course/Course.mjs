import mongoose from "mongoose";

const { Schema } = mongoose

const courceSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [100, 'Name must be at most 100 characters long'],
        trim: true,
    },
    duration:{
        
    }

})
const Cource = mongoose.model('Cource', courceSchema)
export default Cource