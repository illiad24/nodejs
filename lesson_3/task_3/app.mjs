import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) // get the name of the directory

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.end('Hello user');
});


app.get('/goals', (req, res) => {
    res.end('My goals are a secret');
});

app.get('/about', (req, res) => {
    return res.sendFile(path.join(__dirname, "public/about.html"))
});
app.get('/news', (req, res) => {
    return res.sendFile(path.join(__dirname, "public/news.html"))
});
app.get('/info/:myLinks', (req, res) => {

    const reqValue= req.params['myLinks']

    switch (reqValue) {
        case 'sites':
            return res.sendFile(path.join(__dirname, "public/sites.html"))
            break;
        case 'films':
            return res.sendFile(path.join(__dirname, "public/films.html"))
            break;
        case 'me':
            return res.sendFile(path.join(__dirname, "public/me.html"))
            break;
    
        default:
            break;
    }
    return res.sendFile(path.join(__dirname, "public/news.html"))
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});

