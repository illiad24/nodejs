import mongoose from "mongoose";

const { Schema } = mongoose

const ownerSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        minlength: [2, 'First Name must be at least 2 characters long'],
        maxlength: [50, 'First Name must be at most 50 characters long'],
        trim: true,
    },
    addres: {
        type: String,
        required: [true, 'addres is required'],
        minlength: [4, 'addres be at least 4 characters long'],
        maxlength: [50, 'addres must be at most 50 characters long'],
        trim: true,
    }
})

const Owner = mongoose.model('Owner', ownerSchema)

export default Owner