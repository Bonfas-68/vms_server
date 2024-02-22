import http from "http";
import { app } from "./app.js";
import { Server } from "socket.io";
import { socketIO } from "./socket_io/socketio.js";
export const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
// Invoke socketIO by passing io variable to be used in the specific file
socketIO(io);
//Grab the PORT from env or set one for dev environment
const PORT = process.env.PORT || 9000;
// Execute the Server to Start at the Respectve PORT
httpServer.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}...`);
});
