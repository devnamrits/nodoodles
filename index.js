const fs = require('fs');

// Blocking Synchronous I/O
const readIn = fs.readFileSync('./txt/input.txt','utf-8');

const readOut = `Hello The input file contains ${readIn}`;

fs.writeFileSync('./txt/output.txt',readOut)


// Non-Blocking Asynchronous I/O
const readInput = fs.readFile('./txt/input.txt', 'utf-8', (err,data) => {
    console.log(`Read ${data}`);
})
console.log('Reading File');