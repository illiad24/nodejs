

import mongoose from 'mongoose'
import config from '../../config/default.mjs'
const { Schema } = mongoose
const carSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'year is required'],
        min: [1886, 'Введіть коректний рік випуску'],
        max: [new Date().getFullYear(), 'Введіть коректний рік випуску'],
        toInt: true,
    },
    carNumber: {
        type: String,
        required: [true, 'Номера мають містити тільки літери і цифри'],
        match: [/^[a-zA-Z0-9]+$/, 'Номера мають містити тільки літери і цифри'],
    },
    price: {
        toInt: true,
        type: String,
        required: [true, 'Заповніть поле "Ціна автомобіля"'],
    },
    carImg: {
        type: String,
        required: [true, 'Будь ласка, завантажте зображення автомобіля'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    }
})
carSchema.static.checkDatabaseExists = async () => {
    const databases = await mongoose.connection.listDatabases()
    return databases.databases.some((db) => db.name === config.databaseName)
}
carSchema.static.checkCollectionExists = async function () {
    if (await this.checkDatabaseExists()) {
        const collections = await mongoose.connection.db
            .listCollections({ name: 'cars' })
            .toArray()
        return collections.length > 0
    }
    return false
}
const Car = mongoose.model('Car', carSchema)
export default Car