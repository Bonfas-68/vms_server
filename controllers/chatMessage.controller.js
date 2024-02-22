import sql from "mssql";
import config from "../db/config.js";

export const createMessage = async (req, res) => {
  const { messageId, senderId, chat, createdAt, chatId } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("messageId", sql.VarChar, messageId)
      .input("senderId", sql.VarChar, senderId)
      .input("chat", sql.VarChar, chat)
      .input("chatId", sql.VarChar, chatId)
      .input("createdAt", sql.VarChar, createdAt)
      .query(`INSERT INTO chatMessages(
                    messageId,
                    senderId,
                    chatId,
                    chat,
                    createdAt
                ) VALUES(
                    @messageId,
                    @senderId,
                    @chatId,
                    @chat,
                    @createdAt)`);

    const newMessage = await pool
      .request()
      .input("messageId", sql.VarChar, messageId)
      .query(
        `SELECT cm.messageId, cm.senderId, cm.chat, cm.createdAt, cm.chatId, u.user_fullname, u.user_avatar FROM chatMessages cm JOIN users u ON u.id = cm.senderId WHERE messageId = @messageId`
      );

    res.status(200).json({
      status: "success",
      message: "Your message saved successfully",
      data: newMessage.recordset,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
// Deleted Message
export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("messageId", sql.VarChar, messageId)
      .query(`DELETE FROM chatMessages WHERE messageId = @messageId`);

    res.status(200).json({
      status: "success",
      message: "Your message was deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
export const getMessage = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const message = await pool
      .request()
      .query(
        `SELECT messageId, senderId, chat, createdAt, chatId FROM chatMessages`
      );

    res.status(200).json({
      status: "success",
      data: message.recordset,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const messages = await pool
      .request()
      .input("chatId", sql.VarChar, chatId)
      .query(
        `SELECT cm.messageId, cm.senderId, cm.chat, cm.createdAt, cm.chatId, u.user_fullname, u.user_avatar FROM chatMessages cm JOIN users u ON u.id = cm.senderId WHERE chatId = @chatId ORDER BY messageId ASC`
      );

    res.status(200).json({
      status: "success",
      data: messages.recordset,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
export const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { senderId, chat, createdAt, chatId } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("messageId", sql.VarChar, messageId)
      .input("senderId", sql.VarChar, senderId)
      .input("chat", sql.VarChar, chat)
      .input("chatId", sql.VarChar, chatId)
      .input("createdAt", sql.VarChar, createdAt).query(`UPDATE chatMessages
                    SET 
                    messageId = @messageId,
                    senderId = @senderId,
                    chatId = @chatId,
                    chat = @chat,
                    createdAt = @createdAt
                WHERE 
                    messageId = @messageId)`);
    res.status(200).json({
      status: "success",
      message: "Your message updated successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
