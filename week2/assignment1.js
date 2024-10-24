const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const num = 55555;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // root page
    if (pathname === '/') {
        res.write('Hello week2 assignment Larry!');
        res.end()
    } 

    // create data.txt file
    if (pathname === '/create') {
        // Create an empty file
        fs.writeFile('./data.txt', '12345', (err) => {
            res.write('Ready to create data.txt for client!\n');
            res.end('File created successfully.');
        });
    }  else if (pathname.startsWith('/write/')) {
        // Append text to the file
        const textToAdd = pathname.replace('/write/', '');
        fs.appendFile('./data.txt', `${textToAdd}\n`, (err) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Text "${textToAdd}" appended to the file.`);
        });
    }


});

const PORT = 5050;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});