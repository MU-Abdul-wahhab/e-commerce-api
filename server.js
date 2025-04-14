import http from 'http';
import app from './app/app.js';


const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Server is Running on port number ${port}`);
})