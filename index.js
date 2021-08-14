const fs = require('fs');

// Blocking Synchronous I/O
const readIn = fs.readFileSync('./txt/input.txt', 'utf-8');

const readOut = `Hello The input file contains ${readIn}`;

fs.writeFileSync('./txt/output.txt', readOut)


// Non-Blocking Asynchronous I/O
const readInput = fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    console.log(`Read ${data}`);
    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
        fs.readFile(`./txt/${data2}.txt`, 'utf-8', (err, data3) => {
            fs.readFile(`./txt/${data3}.txt`, 'utf-8', (err, data4) => {
                fs.readFile(`./txt/${data4}.txt`, 'utf-8', (err, data5) => {
                    fs.writeFile('./txt/output.txt', data5, err => {
                        console.log("File Written")
                    });
                    console.log(`Wrote ${data5}`);
                })
            })
        })
    })
})
console.log('Reading File');