import DataFileManager from "../utils/DataFileManager.mjs";
class Car {
    static loadCarsList() {
        try {
            return DataFileManager.loadData()
        } catch (error) {
            throw new Error("Список машин не завантажився");

        }
    }

    static addCar(data) {
        try {
            DataFileManager.addItem({ id: new Date().getTime(), ...data })
        } catch (error) {
            throw new Error("Машина не додалась");

        }
    }

    static getCarById(id) {
        try {
            return DataFileManager.getItemById(id)
        } catch (error) {
            throw new Error("Машина не знайдена");

        }
    }

    static updateCarById(id, updatedProperties) {
        try {
            DataFileManager.updateItemById(id, updatedProperties)
        } catch (error) {
            throw new Error("Машина не знайдена");

        }
    }

    static deleteCarById(id) {
        try {
            DataFileManager.deleteItemById(id)
        } catch (error) {
            throw new Error("Машина не видалена");

        }
    }
}

export default Car