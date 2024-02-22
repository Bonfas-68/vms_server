import sql from "mssql";
import config from "../db/config.js";

//Create Posts
export const createBlog = async (req, res) => {
  const { id, user_id, title, created_at, content, image } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("created_at", sql.VarChar, created_at)
      .input("title", sql.VarChar, title)
      .input("content", sql.VarChar, content)
      .input("user_id", sql.VarChar, user_id)
      .input("image", sql.VarChar, image).query(`INSERT INTO blogs(
            id,
            user_id,
            title,
            created_at,
            content,
            image
        ) VALUES(
            @id,
            @user_id,
            @title,
            @created_at,
            @content,
            @image) `);
    res
      .status(201)
      .json({ status: "success", message: "blog creation was successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//Update blog per id
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    let pool = sql.connect(config.sql);
    const blog = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM blogs WHERE id = @id`);
    const isblog = blog.recordset[0];
    if (!isblog) {
      return res
        .status(404)
        .json({ status: "error", error: "blog does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("title", sql.VarChar, title)
        .input("content", sql.VarChar, content)
        .query(
          `UPDATE blogs SET title = @title, content = @content WHERE id = @id`
        );
      res.status(201).json({
        status: "success",
        message: "blog deteled successfully",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//get all blogs
export const fetchBlogs = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const blogs = await pool
      .request()
      .query(
        `SELECT b.id, b.user_id, b.title, b.content, b.image, u.user_fullname, u.user_avatar, b.created_at FROM blogs b JOIN users u ON u.id = b.user_id ORDER BY b.id DESC`
      );
    res.status(201).json({
      status: "success",
      data: blogs.recordset,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//delete a post using id
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    let pool = sql.connect(config.sql);
    const blog = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM blogs WHERE id = @id`);
    const isBlog = blog.recordset[0];
    if (!isBlog) {
      return res
        .status(404)
        .json({ status: "error", error: "blog does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .query(`UPDATE blogs SET deleted = ${true} WHERE id = @id`);
      res
        .status(200)
        .json({ status: "success", message: "blog deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
// Fetch a single blog using id
export const fetchBlog = async (req, res) => {
  const { id } = req.params;
  try {
    let pool = sql.connect(config.sql);
    const blog = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM blogs WHERE id = @id`);
    const isBlog = blog.recordset[0];
    if (!isBlog) {
      return res
        .status(404)
        .json({ status: "error", error: "Blog does not exists" });
    } else {
      res.status(200).json({ status: "success", data: isBlog });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
