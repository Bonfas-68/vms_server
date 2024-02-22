import sql from "mssql";
import config from "../db/config.js";

export const uploadProduct = async (req, res) => {
  const {
    id,
    product_name,
    product_price,
    product_image,
    product_discount,
    product_offer,
    product_description,
    user_id,
    business_id,
  } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("product_name", sql.VarChar, product_name)
      .input("product_price", sql.Int, product_price)
      .input("product_image", sql.VarChar, product_image)
      .input("product_discount", sql.Int, product_discount)
      .input("product_offer", sql.VarChar, product_offer)
      .input("product_description", sql.VarChar, product_description)
      .input("user_id", sql.VarChar, user_id)
      .input("business_id", sql.VarChar, business_id)
      .query(`INSERT INTO business_products(
        id,
        product_name,
        product_price,
        product_image,
        product_discount,
        product_offer,
        product_description,
        user_id,
        business_id
    ) VALUES(
        @id,
        @product_name,
        ${product_price},
        @product_image,
        ${product_discount},
        @product_offer,
        @product_description,
        @user_id,
        @business_id
        ) `);
    res
      .status(200)
      .json({ status: "success", message: "Product added successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error });
  }
};

//fetch all products
export async function getProducts(req, res) {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query(`SELECT business_id,
      bp.id,
      product_description,
      product_discount,
      product_image,
      product_name,
      product_offer,
      product_price,
      u.user_fullName,
      u.user_avatar,
      b.b_name,
      b.b_logo,
      b.b_message,
      b.b_description,
      b.b_image, 
      b.b_gps_location,
      b.b_account_number,
      b.b_account_name,
      b.b_paybill_number,
      b.b_till_number,
      b.b_location,
      b.b_registered_name,
      b.b_registered_number,
      b.b_category,
      bp.user_id
FROM business_products bp 
     join users u ON bp.user_id = u.id 
     join businesses b ON bp.business_id = b.id`);
    const products = result.recordset;
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
//Update a product
export async function updateProduct(req, res) {
  const { id } = req.params;
  const {
    product_name,
    product_price,
    product_image,
    product_discount,
    product_offer,
    product_description,
  } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM business_products WHERE id = @id`);
    const product = result.recordset[0];
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", error: "Product does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("product_name", sql.VarChar, product_name)
        .input("product_price", sql.VarChar, product_price)
        .input("product_image", sql.VarChar, product_image)
        .input("product_discount", sql.VarChar, product_discount)
        .input("product_offer", sql.VarChar, product_offer)
        .input("product_description", sql.VarChar, product_description)
        .query(`UPDATE business_products
            SET
            product_name = @product_name,
            product_price = @product_price,
            product_image = @product_image,
            product_discount = @product_discount,
            product_offer = @product_offer,
            product_description = @product_description
            WHERE id  =  @id`);
    }
    res
      .status(200)
      .json({ status: "success", message: "Product update was successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

//get a product
export async function getProduct(req, res) {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().input("id", sql.VarChar, id)
      .query(`SELECT business_id,
                     bp.id as product_id,
                     product_description,
                     product_discount,
                     product_image,
                     product_name,
                     product_offer,
                     product_price,
                     u.user_fullName,
                     u.user_avatar,
                     b.b_name,
		                 b.b_logo,
                     b.b_message,
                     b.b_description,
                     b.b_image,
                     b.b_gps_location,
                     b.b_account_number,
                     b.b_account_name,
                     b.b_paybill_number,
                     b.b_till_number,
                     b.b_location,
                     b.b_registered_name,
                     b.b_registered_number,
                     b.b_category, 
                     bp.user_id
              FROM business_products bp 
                    join users u ON bp.user_id = u.id 
                    join businesses b ON bp.business_id = b.id
              WHERE bp.id = @id`);
    const product = result.recordset[0];

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", error: "product does not exists" });
    } else {
      res.status(200).json({
        status: "success",
        data: product,
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}

//delete a product
export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input(id, sql.VarChar, id)
      .query(`SELECT * FROM business_products WHERE id = @id`);
    const product = result.recordset[0];
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", error: "product does not exists" });
    } else {
      await pool
        .request()
        .input(id, sql.VarChar, id)
        .query(`DELETE FROM business_products WHERE id = @id`);
      res
        .status(200)
        .json({ status: "success", message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
}
