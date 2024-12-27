import dotenv from 'dotenv'
dotenv.config()
export default Object.freeze({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT,
    uri: process.env.MYSQL_ADDON_URI,
})