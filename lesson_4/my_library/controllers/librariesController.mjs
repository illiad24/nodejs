import Library from "../models/Library.mjs";
class LibrariesController {
    static mainProducts(req, res) {
        const booksList = Library.loadBooks()
        res.render('library/libraryList', { products: booksList })
    }
    static productDetails(req, res) {
        const id = req.params.id
        const book = Library.getBookById(id)
        console.log(book)
        res.render('library/libraryDetails', { product: book })
    }
    static createProduct(req, res) {
        res.render('library/libraryCreate', { product: {} })
    }
    static addProduct(req, res) {
        const bookInfo = req.body
        console.log(bookInfo)
        Library.addBook(bookInfo)
        res.redirect('/libraries')
    }
    static getEditProductForm(req, res) {
        const product = Library.getBookById(req.params.id)
        res.render('library/libraryCreate', { product })
    }

    static updateProduct(req, res) {
        console.log(req.body)

        Library.updateBookById(req.params.id, req.body)
        res.redirect('/libraries')
    }
    static deleteProduct(req, res) {
        console.log(req.body.id)
        Library.deleteBookById(req.body.id)

        res.send(200, 'ok')
    }
}

export default LibrariesController