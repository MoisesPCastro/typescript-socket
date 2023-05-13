import { Socket } from "socket.io";
interface IEventoSocket {
  name: string;
  details: any;
}

const loggedSockets: Array<Socket> = [];
const registerLogin = (socket: Socket) => {
  loggedSockets.push(socket);
};

export default function (socket: Socket) {
  registerLogin(socket);
}

const notifiAll = (event: IEventoSocket) => {
  for (const item of loggedSockets) {
    item.emit(event.name, event.details);
  }
};

export { notifiAll };
