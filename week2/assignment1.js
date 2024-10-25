const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const num = 55555;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const filename = parsedUrl.query.filename || 'data.txt';
    const content = parsedUrl.query.content;

    // root page
    if (pathname === '/') {
        res.write('Hello week2 assignment Larry!');
        res.end()
    } 

    if (!filename) {
        res.end('Error: filename parameter is required.');
        return;
    }

    const filePath = path.join(__dirname, filename);

    // create data.txt file
    if (pathname === '/create') {
        // Create an empty file
        fs.writeFile(filePath, '12345\n', (err) => {
            console.log('Server: Ready to create data.txt for client!');
            res.write('Ready to create data.txt for client!\n');
            res.end('File created successfully.');
        });
    }  else if (pathname.startsWith('/write')) {
        if (!content) {
            res.end('Error: content parameter is required.');
            return;
        } else {
            // Append text to the file
            // const textToAdd = pathname.replace('/write/', '');
            fs.appendFile(filePath, `${content}\n`, (err) => {
                console.log('Server: Ready to append text to the data file.');
                res.end(`Content "${content}" appended to the "${filename}".`);
            });

        }
        
    } else if (pathname === '/read') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err)
            {
                console.log(`Server: fail read "${filename}"`);
                res.write(`Reading "${filename}" file failed.\n`);
                res.end(data);
            } else {
                console.log(`Server: fail read "${filename}"`);
                res.write(`Reading "${filename}" file successfully\n`);
                res.end(data);
            }

        });
    } else if (pathname === '/delete') {
        fs.unlink(filePath, (err) => {
            if(err) {
                console.log('Server: delete file failed');
                res.end('File deleted failed');
            } else {
                console.log('Server: delete "${filename}" successfully!');
                res.end('File deleted successfully');
            }

        });
    }
});

const PORT = 5050;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});