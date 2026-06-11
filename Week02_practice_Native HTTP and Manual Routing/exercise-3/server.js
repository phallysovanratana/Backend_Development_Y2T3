// server.js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form> 
        `);
        return;
    }

    if (url === '/contact' && method === 'POST') {

        let body = '';
        req.on('data' , (chunk) => {
            body += chunk.toString();
        });

        req.on('end' ,  () => {
            console.log("Raw Body : " , body);
            const parsedata = new URLSearchParams(body);
            const name = parsedata.get('name');
            console.log("Submitted Name : " , name);
    
            if (!name || name.trim() === ''){
                res.writeHead(400, {'content-type': 'text/plain'});
                return res.end('Name cannot be empty');
            }

            fs.appendFile('submissions.txt', name + '\n', (err) => {
                if(err){
                    console.error(err);
                    res.writeHead(500, {'content-type': 'text/plain'});
                    return res.end('error saving submission');
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(`
                    <h1>Submission successful</h1>
                    <p>Thank you ${name}</p>
                    <a href="/contact">go back</a>
                `)
            });
        });
        // Implement form submission handling

    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});