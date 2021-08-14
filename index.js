const fs = require('fs');

const readIn = fs.readFileSync('./txt/input.txt','utf-8');

const readOut = `Hello The input file contains ${readIn}`;

fs.writeFileSync('./txt/output.txt',readOut)