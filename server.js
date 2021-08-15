const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/prodData/data.json`);
const productData = JSON.parse(data);

const tempReplace = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    console.log(query, pathname);
    //OVERVIEW
    if (pathname === '/' || pathname === '/overview') {

        const cardsHtml = productData.map(ele => tempReplace(tempCard, ele)).join();
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.writeHead('200', {
            'Content-Type': 'text/html'
        })
        res.end(output);
    }
    //PRODUCT
    else if (pathname === '/product') {
        const product = productData[query.id];
        const output = tempReplace(tempProduct, product);
        res.end(output);
    }
    //API
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/JSON'
        })
        res.end(data);
    }
    //NOT FOUND
    else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-header': 'nothing'
        })
        res.end('Page not Found!');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening at 8000');
})