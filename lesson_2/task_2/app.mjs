import { createServer } from 'node:http';
import fs from 'fs'
const numbersFilePath = 'numbers.txt'
const server = createServer((req, res) => {
    if (req.url.startsWith('/save_num/')) {
        const numStr = req.url.split('/save_num/')[1];
        console.log(numStr);

        if (numStr) {
            fs.appendFileSync(numbersFilePath, `${numStr},`);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('History updated!');
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('No number provided!');
        }
    } else if (req.url === '/sum') {
        fs.readFile(numbersFilePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('Sorry file corrupted!\n')
                return
            }
            const numArr = data.split(',').filter(Boolean).map(Number);
            const sum = numArr.reduce((prevNum, currentValue) => prevNum + currentValue, 0);

            console.log(sum);

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Sum: ${sum}`);
        })
    }
    else if (req.url === '/mult') {
        fs.readFile(numbersFilePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('Sorry file corrupted!\n')
                return
            }
            const numArr = data.split(',').filter(Boolean).map(Number);
            const mult = numArr.reduce((prevNum, currentValue) => prevNum * currentValue, 1);

            console.log(mult);

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Sum: ${mult}`);
        })
    }
    else if (req.url === '/remove') {
        try {
            fs.unlinkSync(numbersFilePath);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File removed successfully!');
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error removing file!');
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});




server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});




