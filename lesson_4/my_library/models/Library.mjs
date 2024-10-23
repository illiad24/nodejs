import DataFileManager from "../utils/DataFileManager.mjs";
class Library {

    static loadBooks() {
        try {
            return DataFileManager.loadData()
        } catch (error) {
            throw new Error("data not loaded");
        }
    }

    static addBook(book) {
        try {
            DataFileManager.addItem({ id: new Date().getTime(), ...book })
        } catch (error) {
            throw new Error("book not added");
        }
    }
    static getBookById(id) {
        try {
            return DataFileManager.getItemById(id)
        } catch (error) {
            throw new Error("book not added");
        }
    }
    static updateBookById(id, updatedProperties) {
        try {
            DataFileManager.updateItemById(id, updatedProperties)
        } catch (error) {
            throw new Error("book not updated");
        }
    }
    static deleteBookById(id) {
        try {
            DataFileManager.deleteItemById(id)
        } catch (error) {
            throw new Error("book not updated");
        }
    }



}

export default Library