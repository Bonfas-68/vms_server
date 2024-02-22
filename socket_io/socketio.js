export function socketIO(io) {
  let onlineUsers = [];
  let notifications = [];

  //Listen to connection event from every user
  io.on("connection", (socket) => {
    socket.on("newUser", (username) => {
      if (username === null) return;
      !onlineUsers?.some((user) => user?.username === username) &&
        onlineUsers?.push({
          username,
          socketId: socket.id,
        });

      console.log("OnlineUsers", onlineUsers);
      // Emit getOnlineUsers to every online user to show them who are online
      io.emit("getOnlineUsers", onlineUsers);
    });

    // Listening to sendMessage event from onlineUser and the emit the getMessage and getNotification back to the specific receiverName if is among onlineUsers
    socket.on("sendMessage", (message) => {
      const user = onlineUsers?.find(
        (user) => user?.username === message?.recipientName
      );

      // Send message if only if the user is among oline users and you have chat content to avoid sending empty messages. Can be handled from frontend but this help to control emition of chats even if user is not chatting
      if (user && message?.chat) {
        io.to(user?.socketId).emit("getMessage", message);
        io.to(user?.socketId).emit("getNotification", {
          senderName: message?.user_fullname,
          senderId: message?.senderId,
          receiverName: message?.recipientName,
          isRead: false,
          createdAt: new Date(),
          message: message?.chat,
        });
      }
      // console.log("message", message);
    });

    // Update users incase one socket disconnect by listening to a disconnect route and emit getOnlineUsers back to all users connnected(online)
    socket.on("disconnect", () => {
      onlineUsers = onlineUsers?.filter(
        (user) => user?.socketId !== socket?.id
      );

      io.emit("getOnlineUsers", onlineUsers);
    });
  });
}
