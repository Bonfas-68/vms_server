import sql from "mssql";
import config from "../db/config.js";

export const getConversations = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const convert = await pool
      .request()
      .query(`SELECT chatId, senderId, receiverId, createdAt FROM chats`);

    res.status(200).json({
      status: "success",
      data: convert.recordset,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
export const getConversation = async (req, res) => {
  const { senderId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const converts = await pool
      .request()
      .input("senderId", sql.VarChar, senderId)
      .query(
        `SELECT c.senderId, c.chatId, c.receiverId, c.createdAt FROM chats c WHERE receiverId = @senderId OR senderId = @senderId`
      );

    res.status(200).json({
      status: "success",
      data: converts.recordset,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
export const getConversationChats = async (req, res) => {
  const { chatId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const converts = await pool
      .request()
      .input("chatId", sql.VarChar, chatId)
      .query(
        `SELECT c.senderId, c.chatId, c.receiverId, c.createdAt FROM chats c WHERE chatId = @chatId`
      );

    res.status(200).json({
      status: "success",
      data: converts.recordset,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

// Clear Converts from your chats
export const clearConversations = async (req, res) => {
  const { chatId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const convert = await pool
      .request()
      .input("chatId", sql.VarChar, chatId)
      .query(`SELECT chatId FROM chats WHERE chatId = @chatId`);

    if (!convert?.recordset.length) {
      return res.status(401).json({
        status: "error",
        message: `You already have no chat convert`,
      });
    } else {
      await pool
        .request()
        .input("chatId", sql.VarChar, chatId)
        .query(`DELETE FROM chats WHERE chatId = @chatId`);

      res.status(200).json({
        status: "success",
        message: "Converts Deleted successfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

// Create chats
export const createConversation = async (req, res) => {
  const { chatId, senderId, receiverId, createdAt } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    const convert = await pool
      .request()
      .input("chatId", sql.VarChar, chatId)
      .input("senderId", sql.VarChar, senderId)
      .input("receiverId", sql.VarChar, receiverId)
      .query(
        `SELECT senderId, receiverId FROM chats WHERE (senderId = @senderId AND receiverId = @receiverId) OR (senderId = @receiverId AND receiverId = @senderId)`
      );

    if (convert?.recordset.length) {
      return res.status(401).json({
        status: "error",
        message: `You already have a chat convert with`,
      });
    } else {
      await pool
        .request()
        .input("chatId", sql.VarChar, chatId)
        .input("senderId", sql.VarChar, senderId)
        .input("receiverId", sql.VarChar, receiverId)
        .input("createdAt", sql.VarChar, createdAt).query(`INSERT INTO chats(
                    senderId,
                    chatId,
                    receiverId,
                    createdAt
                ) VALUES(
                    @senderId,
                    @chatId,
                    @receiverId,
                    @createdAt)`);
      res.status(200).json({
        status: "success",
        message: "You have created a conversation successfully",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};
