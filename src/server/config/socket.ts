import { Server, Socket } from "socket.io";
import { Server as httpsServer } from "http";

let io: Server | null = null;

const users: Record<string, Socket> = {};

const createServer = (server: httpsServer): Server => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  return io;
};

const getInstance = (): Server => {
  if (io === null) {
    throw new Error("Instance not initialized");
  }
  return io;
};

const handleUserConnected = (
  registerEvents: (socket: Socket) => void
): void => {
  getInstance().on("connect", (socket) => {
    console.log(`User ${socket.id} connected `);
    users[socket.id] = socket;

    registerEvents(socket);

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
      socket.disconnect();
      delete users[socket.id];
    });
  });
};

export default {
  createServer,
  handleUserConnected,
};
