import { io } from "socket.io-client";

console.log("🔥 socketTest file loaded");

const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log("🟢 connected from socketTest", socket.id);
  socket.emit("addUser", { sub: "test-user" });
});

socket.on("getUsers", (users) => {
  console.log("👥 users from server", users);
});
