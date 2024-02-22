import sql from "mssql";
// import config from "../../db/config.js";
import config from "../db/config.js";

export async function getSearchedBusinesses(req, res) {
  const { b_name } = req.query;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().input("b_name", sql.VarChar, b_name)
      .query(`SELECT b.id, b_name,
    b_description, b_message, b_email, user_id, user_avatar, user_fullname FROM businesses b join users u ON u.id = b.user_id WHERE b_name Like "%@b_name%"`);
    const business = result.recordset;
    res.status(200).json({ status: "success", data: business });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

export async function getBusinesses(req, res) {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query(`SELECT b.id, b_name,
    b_description, b_message, b_plan_type, b_image, b_logo, b_introVideo, 
    b_gps_location, b_account_number, b_account_name,b_paybill_number, b_till_number, b_location,  b_registered_name,
    b_registered_number, b_category,  b_closeHours, b_openHours,  b_phone, b_email, user_id, user_avatar, user_fullname FROM businesses b join users u ON u.id = b.user_id`);
    const business = result.recordset;
    res.status(200).json({ status: "success", data: business });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
export async function registerBusiness(req, res) {
  // const { id } = req.params;
  const {
    id,
    b_name,
    b_message,
    b_description,
    b_category,
    b_location,
    b_image,
    b_plan_type,
    b_openHours,
    b_closeHours,
    b_email,
    b_phone,
    user_id,
  } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("b_email", sql.VarChar, b_email)
      .query(
        `SELECT * FROM businesses WHERE b_email = '${b_email}' OR b_phone = '${b_phone}'`
      );
    const business = result.recordset[0];
    if (business) {
      return res
        .status(404)
        .json({ status: "error", error: "business already exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("b_name", sql.VarChar, b_name)
        .input("b_message", sql.VarChar, b_message)
        .input("b_description", sql.VarChar, b_description)
        .input("b_image", sql.VarChar, b_image)
        .input("b_plan_type", sql.VarChar, b_plan_type)
        .input("b_openHours", sql.VarChar, b_openHours)
        .input("b_category", sql.VarChar, b_category)
        .input("b_location", sql.VarChar, b_location)
        .input("b_closeHours", sql.VarChar, b_closeHours)
        .input("b_email", sql.VarChar, b_email)
        .input("b_phone", sql.VarChar, b_phone)
        .input("user_id", sql.VarChar, user_id).query(`INSERT INTO businesses(
          id,
          b_name,
          b_message,
          b_description,
          b_image,
          b_plan_type,
          b_closeHours,
          b_openHours,
          b_category,
          b_location,
          b_email,
          b_phone,
          user_id
          ) VALUES(
            @id,
            @b_name,
            @b_message,
            @b_description,
            @b_image,
            @b_plan_type,
            @b_closeHours,
            @b_openHours,
            @b_category,
            @b_location,
            @b_email,
            @b_phone,
            @user_id
            )`);
    }
    res
      .status(200)
      .json({ status: "success", message: "Business registered successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

export async function updateBusinessLogo(req, res) {
  const { id } = req.params;
  const { b_logo } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM businesses WHERE id = @id`);
    const business = result.recordset[0];
    if (!business) {
      return res
        .status(404)
        .json({ status: "error", error: "business does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("b_logo", sql.VarChar, b_logo).query(`UPDATE businesses
          SET 
          b_logo = @b_logo WHERE id  =  @id`);
    }
    res.status(200).json({
      status: "success",
      message: "Business logo update was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
export async function updateBusinessimage(req, res) {
  const { id } = req.params;
  const { b_image } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM businesses WHERE id = @id`);
    const business = result.recordset[0];
    if (!business) {
      return res
        .status(404)
        .json({ status: "error", error: "business does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("b_image", sql.VarChar, b_image).query(`UPDATE businesses
          SET 
          b_image = @b_image WHERE id  =  @id`);
    }
    res.status(200).json({
      status: "success",
      message: "Business logo update was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
export async function updateBusiness(req, res) {
  const { id } = req.params;
  const {
    b_name,
    b_message,
    b_description,
    b_introVideo,
    b_closeHours,
    b_openHours,
    b_email,
    b_phone,
    b_gps_location,
    b_account_number,
    b_account_name,
    b_paybill_number,
    b_till_number,
    b_location,
    b_registered_name,
    b_registered_number,
    b_category,
  } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM businesses WHERE id = @id`);
    const business = result.recordset[0];
    if (!business) {
      return res
        .status(404)
        .json({ status: "error", error: "business does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("b_name", sql.VarChar, b_name)
        .input("b_message", sql.VarChar, b_message)
        .input("b_description", sql.VarChar, b_description)
        .input("b_introVideo", sql.VarChar, b_introVideo)
        .input("b_openHours", sql.VarChar, b_openHours)
        .input("b_closeHours", sql.VarChar, b_closeHours)
        .input("b_email", sql.VarChar, b_email)
        .input("b_gps_location", sql.VarChar, b_gps_location)
        .input("b_account_number", sql.VarChar, b_account_number)
        .input("b_account_name", sql.VarChar, b_account_name)
        .input("b_paybill_number", sql.VarChar, b_paybill_number)
        .input("b_till_number", sql.VarChar, b_till_number)
        .input("b_location", sql.VarChar, b_location)
        .input("b_registered_name", sql.VarChar, b_registered_name)
        .input("b_registered_number", sql.VarChar, b_registered_number)
        .input("b_category", sql.VarChar, b_category)
        .input("b_phone", sql.VarChar, b_phone).query(`UPDATE businesses
          SET 
          b_name = @b_name,
          b_message = @b_message,
          b_description = @b_description,
          b_introVideo = @b_introVideo,
          b_closeHours = @b_closeHours,
          b_openHours = @b_openHours,
          b_email = @b_email,
          b_gps_location = @b_gps_location,
          b_account_number = @b_account_number,
          b_account_name = @b_account_name,
          b_paybill_number = @b_paybill_number,
          b_till_number = @b_till_number,
          b_location = @b_location,
          b_registered_name = @b_registered_name,
          b_registered_number = @b_registered_number,
          b_category = @b_category,
          b_phone = @b_phone WHERE id  =  @id`);
    }
    res
      .status(200)
      .json({ status: "success", message: "Business update was successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

//get single business using id
export async function getBusiness(req, res) {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().input("id", sql.VarChar, id)
      .query(`SELECT b.id as business_id,
      b_name,
      b_message,
      b_description,
      b_image,
      b_logo,
      b_introVideo,
      b_closeHours,
      b_openHours,
      b_email,
      b_gps_location,
      b_plan_type,
      b_account_number,
      b_account_name,
      b_paybill_number,
      b_till_number,
      b_location,
      b_registered_name,
      b_registered_number,
      b_category,
      b_phone,
      user_id,
      u.user_avatar,
      u.user_fullname FROM businesses b join users u ON u.id = b.user_id WHERE b.id = @id`);
    const business = result.recordset[0];
    if (!business) {
      return res
        .status(404)
        .json({ status: "error", error: "business does not exists" });
    } else {
      res.status(200).json({ status: "success", data: business });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

// delete business using id
export async function deleteBusiness(req, res) {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM businesses WHERE id = @id`);
    const business = result.recordset[0];
    if (!business) {
      return res
        .status(404)
        .json({ status: "error", error: "business does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .query(`UPDATE businesses SET b_deleted =${true} WHERE id = @id`);
      res
        .status(200)
        .json({ status: "success", message: "business deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
