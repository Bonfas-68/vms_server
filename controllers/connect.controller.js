import sql from "mssql";
import config from "../db/config.js";

export const getConnected = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const conn = await pool
      .request()
      .query(
        `SELECT my_user_id, connected, connecting_user_id, bcs.my_business_id, b.b_name, b.b_image, b.b_location, b.b_category, u.user_fullname, u.user_avatar, u.username FROM business_connected_users bcs JOIN users u ON u.id = connecting_user_id JOIN businesses b ON b.id = bcs.my_business_id`
      );

    res.status(200).json({
      status: "success",
      data: conn.recordset,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all those you have connected to
export const getMyConnection = async (req, res) => {
  const { connecting_user_id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const my_connection = await pool
      .request()
      .input("connecting_user_id", sql.VarChar, connecting_user_id)
      .query(
        `SELECT my_user_id, connecting_user_id, my_business_id, u.user_fullName, u.user_avatar, u.user_email, u.user_phone, b.b_image, b.b_name, connected FROM business_connected_users bcs join users u ON bcs.my_user_id = u.id join businesses b ON bcs.my_user_id = b.user_id WHERE connecting_user_id = @connecting_user_id`
      );

    res.status(200).json({
      status: "success",
      data: my_connection.recordset,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const creatConnect = async (req, res) => {
  const {
    connectId,
    connected,
    my_user_id,
    connecting_user_id,
    my_business_id,
  } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    const conn = await pool
      .request()
      .input("my_user_id", sql.VarChar, my_user_id)
      .input("connecting_user_id", sql.VarChar, connecting_user_id)
      .query(
        `SELECT * FROM business_connected_users WHERE connecting_user_id = @connecting_user_id and my_user_id = @my_user_id `
      );
    if (conn?.recordset.length) {
      res.status(404).json({
        status: "error",
        message: "User already connected",
      });
    } else {
      await pool
        .request()
        .input("connectId", sql.VarChar, connectId)
        .input("my_user_id", sql.VarChar, my_user_id)
        .input("connected", sql.Bit, connected)
        .input("connecting_user_id", sql.VarChar, connecting_user_id)
        .input("my_business_id", sql.VarChar, my_business_id)
        .query(`INSERT INTO business_connected_users(
                    connectId,
                    my_user_id,
                    connected,
                    connecting_user_id,
                    my_business_id
                    )
              VALUES(
                    @connectId,
	  	              @my_user_id,
                    @connected,
                    @connecting_user_id,
                    @my_business_id)`);

      res.status(200).json({
        status: "success",
        message: "User Connected successfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error?.message,
    });
  }
};
export const updateConnect = async (req, res) => {
  const { connecting_user_id } = req.params;
  const { my_user_id, my_business_id, connected } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    const conn = await pool
      .request()
      .input("connecting_user_id", sql.VarChar, connecting_user_id)
      .query(
        `SELECT * FROM business_connected_users WHERE connecting_user_id = @connecting_user_id`
      );

    // Validate the user existence to ensure no copy of user connect twice to a business
    if (conn.recordset) {
      await pool
        .request()
        .input("my_business_id", sql.VarChar, my_business_id)
        .input("my_user_id", sql.VarChar, my_user_id)
        .input("connecting_user_id", sql.VarChar, connecting_user_id)
        .input("connected", sql.Bit, connected)
        .query(
          `UPDATE business_connected_users 
              SET connected = ${connected},
                  my_user_id = @my_user_id, 
                  my_business_id = @my_business_id, 
                  connecting_user_id = @connecting_user_id 
              WHERE 
                    connecting_user_id = @connecting_user_id 
                    and 
                    my_user_id = @my_user_id 
                    `
        );
      res.status(200).json({
        status: "success",
        message: " Update was successful",
        data: conn.recordset,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Error: User Has not connected to any",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
export const deleteConnect = async (req, res) => {
  const { connecting_user_id } = req.params;
  const { connected } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    const conn = await pool
      .request()
      .input("connecting_user_id", sql.VarChar, connecting_user_id)
      .query(
        `SELECT * FROM business_connected_users WHERE connecting_user_id = @connecting_user_id`
      );

    // Validate the user existence to ensure no copy of user connect twice to a business
    if (conn.recordset) {
      await pool
        .request()
        .input("connecting_user_id", sql.VarChar, connecting_user_id)
        .query(
          `DELETE FROM business_connected_users WHERE connecting_user_id = @connecting_user_id`
        );
      res.status(200).json({
        status: "success",
        message: " DELETE was successful",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Error: User Has not connected to any",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
