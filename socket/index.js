import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  },
});

let users = [];

const addUser = (userData, socketId) => {
  console.log("addUser", userData, socketId);
  !users.some((user) => user.sub === userData.sub) &&
    users.push({
      ...userData,
      socketId,
    });

  const user = users.find((user) => user.sub === userData.sub);
  if (user) {
    user.socketId = socketId;
  }

  console.log("USERS", users);
};

const getUser = (userId) => {
  console.log("trying to find the user");
  console.log("userId", userId);
  console.log("users", users);
  return users.find((user) => {
    console.log("current user is", user);
    return user.sub == userId;
  });
};

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("addUser", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (data) => {
    console.log("sendMessage", data);
    const user = getUser(data.receiverId);
    io.to(user?.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
});
