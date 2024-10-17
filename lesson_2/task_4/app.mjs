import { createServer } from 'node:http';
import fs from 'fs';

const server = createServer((req, res) => {
    const url = req.url
    console.log(url)
    switch (url) {
        case '/':

            inputFile('about.html', res)
            break;
        case '/coffe':
            inputFile('coffe.html', res)
            break;
        case '/music':
            inputFile('music.html', res)
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Error`);
            break;
    }
});

function inputFile(fileName, res) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('Sorry file corrupted!\n')
            return
        }

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
    })
}

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});