import sql from "mssql";
import config from "../db/config.js";

let pool = sql.connect(config.sql);
export const uploadSamples = async (req, res) => {
  const {
    id,
    sample_title,
    sample_image,
    sample_description,
    business_id,
    user_id,
  } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("sample_title", sql.VarChar, sample_title)
      .input("sample_image", sql.VarChar, sample_image)
      .input("sample_description", sql.VarChar, sample_description)
      .input("business_id", sql.VarChar, business_id)
      .input("user_id", sql.VarChar, user_id)
      .query(`INSERT INTO business_sample_images(
        id,
        sample_title,
        sample_image,
        sample_description,
        business_id,
        user_id
    ) VALUES(
        @id,
        @sample_title,
        @sample_image,
        @sample_description,
        @business_id,
        @user_id
        ) `);
    res.status(200).json({
      status: "success",
      message: "Sample product added successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
//fetch all products
export async function getSamples(req, res) {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(`SELECT * FROM business_sample_images`);
    const samples = result.recordset;
    res.status(200).json({ status: "success", data: samples });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
//Update a product
export async function updateSample(req, res) {
  const { id } = req.params;
  const { sample_title, sample_image, sample_description } = req.body;
  try {
    const result = await pool
      .request()
      .input(id, sql.VarChar, id)
      .query(`SELECT * FROM business_sample_images WHERE id = @id`);
    const sample = result.recordset[0];
    if (!sample) {
      return res
        .status(404)
        .json({ status: "error", error: "sample product does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("sample_title", sql.VarChar, sample_title)
        .input("sample_image", sql.VarChar, sample_image)
        .input("sample_description", sql.VarChar, sample_description)
        .query(`UPDATE business_sample_images
              SET 
              sample_title = @sample_title,
              sample_image = @sample_image,
              sample_description = @sample_description
              WHERE id  =  @id`);
    }
    res.status(200).json({
      status: "success",
      message: "Sample Product update was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

//get a product
export async function getSample(req, res) {
  const { id } = req.params;
  try {
    const result = await pool
      .request()
      .input(id, sql.VarChar, id)
      .query(`SELECT * FROM business_sample_images WHERE id = @id`);
    const sample = result.recordset[0];
    if (!sample) {
      return res
        .status(404)
        .json({ status: "error", error: "Sample Products does not exists" });
    } else {
      res.status(200).json({ status: "success", data: sample });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

//delete a product
export async function deleteSample(req, res) {
  const { id } = req.params;
  try {
    const result = await pool
      .request()
      .input(id, sql.VarChar, id)
      .query(`SELECT * FROM business_sample_images WHERE id = @id`);
    const sample = result.recordset[0];
    if (!sample) {
      return res
        .status(404)
        .json({ status: "error", error: "sample does not exists" });
    } else {
      await pool
        .request()
        .input(id, sql.VarChar, id)
        .query(
          `UPDATE business_sample_images SET sample_deleted = ${true} WHERE id = @id`
        );
      res.status(200).json({
        status: "success",
        message: "Sample product deleted successfully",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
