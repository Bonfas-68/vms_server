import sql from "mssql";
import bcryptjs from "bcryptjs";
import config from "../db/config.js";

//Update a user Using id
export const updateMe = async (req, res) => {
  const { id } = req.params;
  const {
    user_fullname,
    user_phone,
    user_email,
    username,
    user_location,
    user_gps_location,
    user_hostel_name,
    user_hostel_number,
    user_bio,
    user_school_email,
  } = req.body;

  try {
    //Validate User before update
    const pool = await sql.connect(config.sql);
    const user = await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("user_fullname", sql.VarChar, user_fullname)
      .input("user_email", sql.VarChar, user_email)
      .query(
        `SELECT user_email, user_fullname FROM users WHERE id = @id AND user_fullname = @user_fullname AND user_email = @user_email`
      );
    const isUser = user.recordset[0];
    if (isUser) {
      await pool
        .request()
        .input("user_fullname", sql.VarChar, user_fullname)
        .input("user_phone", sql.VarChar, user_phone)
        .input("username", sql.VarChar, username)
        .input("user_email", sql.VarChar, user_email)
        .input("id", sql.VarChar, id)
        .input("user_hostel_name", sql.VarChar, user_hostel_name)
        .input("user_hostel_number", sql.VarChar, user_hostel_number)
        .input("user_bio", sql.VarChar, user_bio)
        .input("user_school_email", sql.VarChar, user_school_email)
        .input("user_gps_location", sql.VarChar, user_gps_location)
        .input("user_location", sql.VarChar, user_location).query(`UPDATE users
              SET 
                user_fullname = @user_fullname,
                user_email =  @user_email,
                user_phone = @user_phone,
                username = @username,
                user_location = @user_location,
                user_hostel_name = @user_hostel_name,
                user_hostel_number = @user_hostel_number,
                user_bio = @user_bio,
                user_gps_location = @user_gps_location
                user_school_email = @user_school_email
              WHERE id = @id`);
      //return the success update
      res
        .status(200)
        .json({ status: "success", message: "User updated successfuly" });
    } else {
      return res
        .status(404)
        .json({ status: "error", error: "User does not exists" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error });
  }
};

//Delete user using id
export const deleteMe = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const user = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM users WHERE id = @id`);
    const isUser = user.recordset[0];
    if (!isUser) {
      return res.status(404).json({ error: "User does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .query(`Update users SET user_deleted =${true} WHERE id = @id`);
      res
        .status(200)
        .json({ status: "success", message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//Get a user Using id
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const user = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM users WHERE id = @id`);
    const isUser = user.recordset[0];
    if (isUser) {
      res.status(200).json({ status: "success", data: isUser });
    } else {
      return res
        .status(404)
        .json({ status: "error", error: "User does not exists" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
//User CRUD operation
export const getUsers = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query(`SELECT 
    u.id,
    u.user_fullname,
    u.user_phone,
    u.user_avatar,
    u.user_email,
    u.username,
    u.created_at,
    u.user_location,
    u.user_hostel_name,
    u.user_hostel_number,
    u.user_bio,
    u.user_school_email,
    b.b_name,
    b.b_image FROM users u JOIN businesses b ON b.user_id = u.id`);
    const results = await pool.request().query(`SELECT 
    * FROM users`);
    const usersWithBusiness = result.recordset;
    const users = results.recordset;
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
