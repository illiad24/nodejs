import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [50, 'Title must be at most 50 characters long'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        toInt: true,
    },
    count: {
        type: Number,
        required: [true, 'Count is required'],
        toInt: true,
    },
})

const Product = mongoose.model('Product', productSchema)
export default Product