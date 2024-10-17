
// Задача 5. Створити додаток з історією. 
// У файлі json зберігаємо усі роути та кількість відвідувань.
//  У налаштуваннях settings.json зберігати який роут
//   треба використати для перегляду
//   історії та назву файлу де зберігається історія
import { createServer } from 'node:http';
import fs from 'fs';
import JsonData from './settings.json' assert { type: 'json' }


const historyRoute = JsonData.historyRoute;
const historyFilePath = JsonData.historyFilePath;

const server = createServer((req, res) => {
    const url = req.url

    if (!fs.existsSync(historyFilePath)) {
        fs.writeFileSync(historyFilePath, JSON.stringify({}), 'utf-8');
        console.log('Файл історії створено:', historyFilePath);
    }
    if (url === historyRoute) {
        const historyData = fs.readFileSync(historyFilePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(historyData);
        console.log('Виведено історію відвідувань');
        return;
    }
    fs.readFile(historyFilePath, 'utf-8', (err, data) => {
        if (err) throw err;

        let history = JSON.parse(data);
        const route = url;

        if (!history[route]) {
            history[route] = 0;
        }
        history[route] += 1;

        fs.writeFile(historyFilePath, JSON.stringify(history, null, 2), (err) => {
            if (err) throw err;
            console.log(`Історію оновлено для роута: ${route}`);
        });

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Route ${route} visited ${history[route]} times.`);
    });
});


server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});