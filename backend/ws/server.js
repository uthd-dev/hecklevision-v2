const { Server } = require("socket.io");

//Create WS server and attach to node http server
exports = module.exports = server => {
  /* WS SERVER */
  const io = new Server(server, {
    cors: {
      origin: "http://localhost",
    },
  });

  /* MIDDLEWARE */
  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
  });

  /* HANDLERS */
  io.on("connection", (socket) => {
      //incl other files here eg. require("./file")(socket, io);
  })
};
