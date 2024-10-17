import { createServer } from 'node:http';

const server = createServer((req, res) => {
    const action = req.url.split('/')[1];
    const numbers = req.url.split('/')[2].split('-').map(Number);
    let result
    switch (action) {
        case 'add':
            result = numbers.reduce((prevSum, item) => prevSum + item, 0)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Sum: ${result}`);
            break;
        case 'subtract':
            result = numbers.reduce((prevSum, item) => prevSum - item, 0)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Sum: ${result}`);
            break;
        case 'mult':
            result = numbers.reduce((prevSum, item) => prevSum * item, 1)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Sum: ${result}`);
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Error`);
            break;
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});