const http = require('http');

const server = http.createServer((req,res) => {
    const pathName = req.url;
    console.log(pathName);
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is OVERVIEW page');
    }
    else if(pathName === '/product'){
        res.end('This is PRODUCT page');
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