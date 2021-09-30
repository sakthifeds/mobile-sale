console.log('hello');

const http = require('http');
const app = require('./backend/app'); //will have all the middlewares- will take care of all incoming request;
const port = process.env.PORT || 3000
// const server = http.createServer((req, res) =>{
//     res.end('this is my first response');
// });

app.set('port', port) //set the port to app.js middleware - to catch the incoming request
const server = http.createServer(app);


server.listen(port); 