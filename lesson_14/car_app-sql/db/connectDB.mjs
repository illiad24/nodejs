import config from '../config/default.mjs'
import mysql from 'mysql2/promise'
// Функція для підключення до MongoDB
async function connectToMySQL() {
    try {
        const pool = mysql.createPool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port,
            uri: config.uri,

        })
        console.log('Успішно підключено до MySQL')
        return pool
    } catch (err) {
        console.error('Помилка підключення до MySQL:', err)
    }
}

const pool = await connectToMySQL()
export default pool