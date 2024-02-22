import sql from "mssql";
import config from "../db/config.js";

export const addNotificication = async (req, res) => {
  const { id, senderId, receiverId, type, createdAt, notifyFor, isRead } =
    req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("senderId", sql.VarChar, senderId)
      .input("receiverId", sql.Int, receiverId)
      .input("type", sql.VarChar, type)
      .input("createdAt", sql.Int, createdAt)
      .input("notifyFor", sql.VarChar, notifyFor)
      .input("isRead", sql.VarChar, isRead).query(`INSERT INTO notifications(
        id,
        senderId,
        receiverId,
        type,
        createdAt,
        notifyFor,
        isRead,
    ) VALUES(
        @id,
        @senderId,
        @receiverId,
        @type,
        @createdAt,
        @notifyFor,
        @isRead
        ) `);
    res
      .status(200)
      .json({ status: "success", message: "Notification added successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error });
  }
};

//fetch all products
export async function getNotifications(req, res) {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query(`SELECT           
      n.id,
      u.user_fullName,
      u.user_avatar,
      n.senderId,
      n.receiverId,
      n.type,
      n.isRead,
      n.createdAt,
      n.notifyFor       
FROM notifications n 
     JOIN users u ON n.senderId = u.id 
     `);
    const notifications = result.recordset;
    res.status(200).json({ status: "success", data: notifications });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

//delete a notification
export async function getNotification(req, res) {
  const { receiverId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("receiverId", sql.VarChar, receiverId)
      .query(`SELECT * FROM notifications WHERE receiverId = @receiverId`);
    const notifications = result.recordset[0];
    if (!notifications) {
      return res
        .status(404)
        .json({ status: "error", error: "notification does not exists" });
    } else {
      await pool.request().input("receiverId", sql.VarChar, receiverId)
        .query(`SELECT n.id,
        u.user_fullName,
        u.user_avatar,
        n.senderId,
        n.receiverId,
        n.type,
        n.isRead,
        n.createdAt,
        n.notifyFor       
  FROM notifications n 
       JOIN users u ON n.senderId = u.id WHERE receiverId = @receiverId`);
      res.status(200).json({
        status: "success",
        data: notifications,
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
export async function deleteNotification(req, res) {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input(id, sql.VarChar, id)
      .query(`SELECT * FROM notifications WHERE id = @id`);
    const notifications = result.recordset[0];
    if (!notifications) {
      return res
        .status(404)
        .json({ status: "error", error: "notification does not exists" });
    } else {
      await pool
        .request()
        .input(id, sql.VarChar, id)
        .query(`DELETE FROM notifications WHERE id = @id`);
      res.status(200).json({
        status: "success",
        message: "Notification deleted successfully",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
//delete all notifications
export async function deleteAllNotifications(req, res) {
  const { receiverId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("receiverId", sql.VarChar, receiverId)
      .query(`SELECT * FROM notifications WHERE receiverId = @receiverId`);
    const notifications = result.recordset[0];
    if (!notifications) {
      return res
        .status(404)
        .json({ status: "error", error: "notification does not exists" });
    } else {
      await pool
        .request()
        .input("receiverId", sql.VarChar, receiverId)
        .query(`DELETE FROM notifications WHERE receiverId = @receiverId`);
      res.status(200).json({
        status: "success",
        message: "You deleted all your Notifications",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
