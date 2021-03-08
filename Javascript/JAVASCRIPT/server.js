// const http = require('http');

// const server = http.createServer((request, response) => {
//     response.setHeader('content-Type', 'text/html');
//     response.end('<h1>Hello</h1>')
// });

// server.listen(3000);

const express  = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello')
});

app.listen(3000, ()=>{
    console.log("app is running on port 3000")
});