import io from "socket.io-client";
const localhost = "http://localhost:3333";
export default io(localhost?.replace("https", "wss"));