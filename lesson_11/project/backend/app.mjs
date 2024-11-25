import express from 'express'
import routes from './src/v1/routes/index.mjs'
import connectDB from './db/connectDB.mjs'
import middleware from './middleware/index.mjs'
import errorHandler from './middleware/errorHandler.mjs'

const app = express()

//підключення бази даних
connectDB()
// Використання допоміжних middleware
middleware(app)
//підключення роутів
app.use('/api/v1/', routes)
//обробка помилок
errorHandler(app)

export default app


const port = process.env.PORT || 3000; // Use Render's port or 3000 locally
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
