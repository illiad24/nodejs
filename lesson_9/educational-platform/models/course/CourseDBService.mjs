import Course from "./Course.mjs";
import MongooseCRUDManager from "../MongooseCRUDManager.mjs";

class CourseDBService extends MongooseCRUDManager {
    async getList(filters) {
        try {
            const res = await super.getList(filters, null, ['students',
                {
                    fieldForPopulation: 'seminars.responsibleStudent',
                    requiredFieldsFromTargetObject: 'name age',
                },])
            return res
        } catch (error) {
            console.error(error)
        }
    }
}

export default new CourseDBService(Course)