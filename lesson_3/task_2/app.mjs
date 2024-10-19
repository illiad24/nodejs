import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename) // get the name of the directory
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.end('index',{title:'start page'});
});


app.get('/coffe', (req, res) => {
    res.render('index',{title:'coffe'});
});

app.get('/music', (req, res) => {
    res.render('index',{title:'music'});
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});

