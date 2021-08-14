const http = require('http');

const server = http.createServer((req,res) => {
    res.end("Hello everyone");
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening at 8000');
})