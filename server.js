const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/prodData/data.json`);
const productData = JSON.parse(data);

const server = http.createServer((req,res) => {
    const pathName = req.url;
    console.log(pathName);
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is OVERVIEW page');
    }
    else if(pathName === '/product'){
        res.end('This is PRODUCT page');
    }
    else if(pathName === '/api'){
        res.writeHead(200,{
            'Content-type':'application/JSON'
        })
        res.end(data);
    }
    else{
        res.writeHead(404,{
            'content-type':'text/html',
            'my-header':'nothing'
        })
        res.end('Page not Found!');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening at 8000');
})