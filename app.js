//Required Modules
const express = require("express");
const app = express();

//To allow for express & socket.io to use the same webserver
const http = require("http");
const server = http.createServer(app);
const io = require("./ws/server")(server);

const port = process.env.PORT || 80; //web server port

function init () {
    server.listen(port, (req, res) => { //start listening on specified port
        console.log(`Server started on port ${port}`);
    })
}

app.use(express.json); //body-parser replacement



init(); //start