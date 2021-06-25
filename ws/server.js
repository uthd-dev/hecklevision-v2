const { Server, Socket } = require("socket.io");

const rCodes = ["UTHD12", "C34A15"];
const dNames = []; //NOTE: this needs to not be global in the future, perhaps have an array like this per db doc, and each db doc is for one room. Otherwise, ppl cant have the same name even across rooms

//Create WS server and attach to node http server
exports = module.exports = server => {
  /* WS SERVER */
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://192.168.8.161:3000"]
    },
  });

  /* MIDDLEWARE */

  /* HANDLERS */
  io.on("connection", socket => {
    socket.on("request-join", auth => {
      handleJoinRequest(socket, auth);
    });

    socket.on("disconnect", () => {
      handleDisconnect(socket);
    });
    //incl other files here eg. require("./file")(socket, io);
  });

  function handleJoinRequest(socket, auth) {
    const dName = (socket.dName = auth.dName);
    const rCode = (socket.rCode = auth.rCode);

    if (rCodes.includes(rCode) && !dNames.includes(dName))
      return handleJoin(socket, auth);
    else if (!rCodes.includes(rCode))
      return socket.emit("join-status", "invalid_code_error");
    else if (dNames.includes(dName))
      return socket.emit("join-status", "name_taken_error");
    else return socket.emit("join-status", "unexpected_error");
  }

  function handleJoin(socket, auth) {
    socket.join(socket.rCode);
    dNames.push(socket.dName);
    socket.emit("join-status", "join_success");

    createChatMessageListener(socket);
  }

  function createChatMessageListener(socket) {
    socket.on("chat-message", data => {
      io.to(socket.rCode).emit("chat-message", {
        author: socket.dName,
        content: data,
      });
    });
  }

  function handleDisconnect(socket) {
    let index = dNames.indexOf(socket.dName);
    dNames.splice(index, 1);
  }
};
