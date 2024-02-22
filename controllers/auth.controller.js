import sql from "mssql";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../db/config.js";

// Authentication
export const signup = async (req, res) => {
  const {
    id,
    user_fullname,
    user_avatar,
    user_email,
    user_phone,
    user_password,
    created_at,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(user_password, 10);

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("user_email", sql.VarChar, user_email)
      .query(
        `SELECT user_email, user_phone  FROM users WHERE user_email = '${user_email}' OR user_phone = '${user_phone}' OR user_fullname = '${user_fullname}'`
      );
    const user = result.recordset[0];
    if (user) {
      return res
        .status(404)
        .json({ status: "error", error: "User already exists" });
    } else {
      await pool
        .request()
        .input("user_fullname", sql.VarChar, user_fullname)
        .input("user_phone", sql.VarChar, user_phone)
        .input("created_at", sql.VarChar, created_at)
        .input("user_email", sql.VarChar, user_email)
        .input("user_avatar", sql.VarChar, user_avatar)
        .input("id", sql.VarChar, id)
        .input("user_password", sql.VarChar, hashedPassword)
        .query(`INSERT INTO users(
                id,
                user_fullname,
                user_email,
                user_phone,
                created_at,
                user_avatar,
                user_password
            ) VALUES(
                @id,
                @user_fullname,
                @user_email,
                @user_phone,
                @created_at,
                @user_avatar,
                '${hashedPassword}') `);
      res
        .status(200)
        .json({ status: "success", message: "created successfuly" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

export const signin = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("user_email", sql.VarChar, user_email)
      .query(`SELECT * FROM users WHERE user_email = '${user_email}'`);
    const user = result.recordset[0];
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", error: "Wrong credentials" });
    } else {
      if (!bcryptjs.compareSync(user_password, user.user_password)) {
        return res
          .status(404)
          .json({ status: "failed", error: "Wrong credentials" });
      } else {
        const token = `CHATCON ${jwt.sign({ id: user.id }, config.jwt_secret)}`;
        return res.status(200).json({
          status: "success",
          data: {
            user_fullname: user.user_fullname,
            user_avatar: user.user_avatar,
            id: user.id,
            token,
          },
          message: "User login successfully",
        });
      }
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
