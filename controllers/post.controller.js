import sql from "mssql";
import config from "../db/config.js";

//Create Posts
export const createPost = async (req, res) => {
  const { id, user_id, created_at, content, image } = req.body;
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("content", sql.VarChar, content)
      .input("user_id", sql.VarChar, user_id)
      .input("created_at", sql.VarChar, created_at)
      .input("image", sql.VarChar, image).query(`INSERT INTO posts(
            id,
            user_id,
            content,
            image,
            created_at
        ) VALUES(
            @id,
            @user_id,
            @content,
            @image,
            @created_at) `);
    res
      .status(201)
      .json({ status: "success", message: "Post creation was successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//Update Post per id
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { image, content } = req.body;
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    const post = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM posts WHERE id = @id`);
    const isPost = post.recordset[0];
    if (!isPost) {
      return res
        .status(404)
        .json({ status: "error", error: "Post does not exists" });
    } else {
      //connect to database
      const pool = await sql.connect(config.sql);
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("image", sql.VarChar, image)
        .input("content", sql.VarChar, content)
        .query(
          `UPDATE posts SET image = @image, content = @content WHERE id = @id`
        );
      res.status(201).json({
        status: "success",
        message: "post updated successfully",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//get all posts
export const fetchPosts = async (req, res) => {
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    const posts = await pool
      .request()
      .query(
        `SELECT p.id, user_id, u.user_avatar,u.user_fullname, u.username, content, image FROM posts p Join users u ON u.id = p.user_id `
      );
    res.status(201).json({
      status: "success",
      data: posts.recordset,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//delete a post using id
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    const post = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM posts WHERE id = @id`);
    const isPost = post.recordset[0];
    if (!isPost) {
      return res
        .status(404)
        .json({ status: "error", error: "Post does not exists" });
    } else {
      //connect to database
      const pool = await sql.connect(config.sql);
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .query(`DELETE FROM posts WHERE id = @id`);
      res
        .status(200)
        .json({ status: "success", message: "Post deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const fetchPost = async (req, res) => {
  const { id } = req.params;
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    const post = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(
        `SELECT p.id, p.created_at, p.image, p.content, p.user_id, u.username, u.user_fullName, u.user_avatar FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = @id`
      );
    const isPost = post.recordset[0];
    if (!isPost) {
      return res
        .status(404)
        .json({ status: "error", error: "Post does not exists" });
    } else {
      res.status(200).json({ status: "success", data: isPost });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
