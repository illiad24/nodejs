import Student from "./Student.mjs";
import MongooseCRUDManager from "../MongooseCRUDManager.mjs";

class StudentDBService extends MongooseCRUDManager {
    static async getList({ filters }) {
        try {
            const res = await Type.find(filters)
            return res
        } catch (error) {
            return []
        }

    }
}

export default new StudentDBService(Student)