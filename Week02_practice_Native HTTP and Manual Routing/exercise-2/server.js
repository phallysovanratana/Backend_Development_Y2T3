// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `);
    }

    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        return res.end(`
            <html>
                <head>
                    <title>About</title>
                </head>
                <body>
                    <h1>About us</h1>
                    <p>at CADT, we love node.js!</p>
                </body>
            </html>
            `);
    }

    else if(url === '/contact-us' && method === 'GET') {
        res.writeHead(200, {'Content-Type' : "text/html"});
        return res.end(`
            <html>
                <head>
                    <title>contact</title>
                </head>
                <body>
                    <h1>Contact Us</h1>
                    <p>email : cadt@gmail.com</p>
                    <p>tell : 012345678</p>
                    <p>fb : cadtngmeaneytt</p>
                </body>
            </html>
            `)
    }
    else if(url === '/products' && method === 'GET') {
        res.writeHead(200, {'Content-Type' : "text/html"});
        return res.end(`
            <html>
                <head>
                    <title>products</title>
                </head>
                <body>
                    <h1>Buy one get one</h1>
                    <p>we offer you a lots of stuff here</p>
                </body>
            </html>
            `)
    }

    else if(url === '/projects' && method === 'GET'){
        res.writeHead(200 , {'Content-Type' : 'text/html'});
        return res.end(`
            <head><title>projects</title></head>
            <body>
                <h1>Projects</h1>
                <p>these are our projects</p>            
            </body>
            `);
    }
    // Implement more routes here
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
