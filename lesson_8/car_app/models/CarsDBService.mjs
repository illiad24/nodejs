import Car from './Car.mjs'
import mongoose from 'mongoose'
class CarsDBService {
    static async getList() {
        try {
            const exists = await Car.checkCollectionExists
            if (exists) {
                const data = await mongoose.model(collectionName).find().exec()
                return data
            }
            return (await Car.find({})) ?? []
        } catch (error) {
            return []
        }
    }
    static async create(data) {
        const car = new Car(data)
        return await car.save()
    }
    static async getById(id) {
        return await Car.findById(id)
    }
    static async update(id, data) {
        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value != null && value !== '')
        );

        return await Car.findByIdAndUpdate(id, { $set: updateData }, {
            new: true,
            runValidators: true,
        });
    }
    static async deleteById(id) {

        return await Car.findByIdAndDelete(id)
    }
}
export default CarsDBService