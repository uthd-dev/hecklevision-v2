const { Server } = require("socket.io");

//Create WS server and attach to node http server
exports = module.exports = server => {
  /* WS SERVER */
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  /* MIDDLEWARE */

  /* HANDLERS */
  io.on("connection", socket => {
    //incl other files here eg. require("./file")(socket, io);
    setTimeout(() => {
      socket.emit("hello", "hello world");
    }, 3000);
  });
};
