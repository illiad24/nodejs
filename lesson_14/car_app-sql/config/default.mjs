import dotenv from 'dotenv'
dotenv.config()
export default Object.freeze({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
})