import sql from "mssql";
import config from "../db/config.js";

export const addReviews = async (req, res) => {
  const {
    id,
    content,
    user_id,
    product_id,
    business_id,
    updated_at,
    created_at,
    rate,
  } = req.body;
  let pool = await sql.connect(config);
  try {
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM reviews WHERE id = @id`);

    if (result.recordset.length >= 1) {
      res.status(404).json({ status: "error", message: "Review is available" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("content", sql.VarChar, content)
        .input("user_id", sql.VarChar, user_id)
        .input("business_id", sql.VarChar, business_id)
        .input("product_id", sql.VarChar, product_id)
        .input("created_at", sql.VarChar, created_at)
        .input("updated_at", sql.VarChar, updated_at)
        .input("rate", sql.Int, rate).query(`INSERT INTO reviews(
        id,
        content,
        user_id,
        business_id,
        product_id,
        created_at,
        updated_at,
        rate
      ) VALUES(
        @id,
        @content,
        @user_id,
        @business_id,
        @product_id,
        @created_at,
        @updated_at,
        ${rate}
      )`);
      res
        .status(200)
        .json({ status: "success", message: "Review Was Successful" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT 
        rws.id,
        rws.content,
        rws.user_id,
        rws.business_id,
        rws.product_id,
        rws.created_at,
        rws.rate,
        u.user_fullname,
        u.user_avatar FROM reviews rws JOIN users u ON u.id = rws.user_id 
        `);

    res.status(200).json({ status: "success", data: result.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    let pool = await sql.connect(config);
    const result = await pool.request().input("id", sql.VarChar, id)
      .query(`SELECT 
        id FROM reviews WHERE id = @id 
        `);
    if (result?.recordset?.length >= 1) {
      await pool.request().input("id", sql.VarChar, id).query(`
        
        DELETE FROM reviews 
        `);
      res
        .status(200)
        .json({ status: "success", message: "Reviews removed successfully" });
    } else {
      res.status(404).json({ status: "error", message: "No review Found" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};
export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { content, updated_at } = req.body;
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT id FROM reviews WHERE id = @id`);
    if (result?.recordset?.length >= 1) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("content", sql.VarChar, content)
        .input("updated_at", sql.VarChar, updated_at).query(`
          UPDATE reviews SET content = @content, updated_at = @updated_at WHERE id = @id 
        `);
      res
        .status(200)
        .json({ status: "success", message: "Review update was successfully" });
    } else {
      res.status(404).json({ status: "error", message: "No review Found" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};
