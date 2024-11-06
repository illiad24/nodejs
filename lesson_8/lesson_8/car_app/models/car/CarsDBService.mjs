import Car from './Car.mjs'
import Owner from '../owner/Owner.mjs';
class CarsDBService {
    static async getList() {
        try {

            console.log(1)
            const data = await Car.find().populate('owner')
            console.log('==============data')
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
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