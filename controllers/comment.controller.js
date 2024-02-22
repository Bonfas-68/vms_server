import sql from "mssql";
import config from "../db/config.js";

//connect to database

//Create comments
export const createBusinessComment = async (req, res) => {
  const { content, user_id, business_id, created_at, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("business_id", sql.VarChar, business_id)
      .input("content", sql.VarChar, content)
      .input("created_at", sql.VarChar, created_at)
      .input("user_id", sql.VarChar, user_id)
      .query(`INSERT INTO business_comments(
            id,
            user_id,
            business_id,
            created_at,
            content
        ) VALUES(
            @id,
            @user_id,
            @business_id,
            @created_at,
            @content) `);
    res.status(201).json({
      status: "success",
      message: "comment creation was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createProductsComment = async (req, res) => {
  const { content, user_id, product_id, created_at, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("product_id", sql.VarChar, product_id)
      .input("content", sql.VarChar, content)
      .input("created_at", sql.VarChar, created_at)
      .input("user_id", sql.VarChar, user_id)
      .query(`INSERT INTO products_comments(
            id,
            user_id,
            product_id,
            created_at,
            content
        ) VALUES(
            @id,
            @user_id,
            @product_id,
            @created_at,
            @content) `);
    res.status(201).json({
      status: "success",
      message: "comment creation was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createSamplesComment = async (req, res) => {
  const { content, user_id, sample_id, created_at, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("content", sql.VarChar, content)
      .input("created_at", sql.VarChar, created_at)
      .input("user_id", sql.VarChar, user_id)
      .input("sample_id", sql.VarChar, sample_id)
      .query(`INSERT INTO samples_products_comments(
            id,
            user_id,
            sample_id,
            created_at,
            content
        ) VALUES(
            @id,
            @user_id,
            @sample_id,
            @created_at,
            @content) `);
    res.status(201).json({
      status: "success",
      message: "comment creation was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createPostsComment = async (req, res) => {
  const { content, user_id, post_id, created_at, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("post_id", sql.VarChar, post_id)
      .input("content", sql.VarChar, content)
      .input("created_at", sql.VarChar, created_at)
      .input("user_id", sql.VarChar, user_id).query(`INSERT INTO posts_comments(
            id,
            user_id,
            post_id,
            created_at,
            content
        ) VALUES(
            @id,
            @user_id,
            @post_id,
            @created_at,
            @content) `);
    res.status(201).json({
      status: "success",
      message: "comment creation was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createNewsComment = async (req, res) => {
  const { content, user_id, news_id, created_at, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("news_id", sql.VarChar, news_id)
      .input("content", sql.VarChar, content)
      .input("created_at", sql.VarChar, created_at)
      .input("user_id", sql.VarChar, user_id).query(`INSERT INTO news_comments(
            id,
            user_id,
            news_id,
            created_at,
            content
        ) VALUES(
            @id,
            @user_id,
            @news_id,
            @created_at,
            @content) `);
    res.status(201).json({
      status: "success",
      message: "comment creation was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createBlogsComment = async (req, res) => {
  const { content, user_id, blog_id, created_at, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("blog_id", sql.VarChar, blog_id)
      .input("content", sql.VarChar, content)
      .input("created_at", sql.VarChar, created_at)
      .input("user_id", sql.VarChar, user_id).query(`INSERT INTO blogs_comments(
            id,
            user_id,
            blog_id,
            created_at,
            content
        ) VALUES(
            @id,
            @user_id,
            @blog_id,
            @created_at,
            @content) `);
    res.status(201).json({
      status: "success",
      message: "comment creation was successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//get all comments for business_comments, products_comments, samples_products_comments
export const fetchBusinessComments = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const comments = await pool
      .request()
      .query(
        `SELECT c.id, c.user_id,u.user_fullname, u.user_avatar, c.business_id, c.content FROM business_comments c join users u on u.id = c.user_id ORDER BY c.id DESC`
      );

    res.status(200).json({ status: "success", data: comments.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const fetchProductComments = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const comments = await pool
      .request()
      .query(
        `SELECT pc.id, pc.user_id, u.user_avatar, u.user_fullName, u.username, pc.product_id, pc.content FROM products_comments AS pc join users AS u ON u.id = pc.user_id `
      );

    res.status(200).json({ status: "success", data: comments.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const fetchSampleComments = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const comments = await pool
      .request()
      .query(
        `SELECT id, user_id, sample_id, content FROM samples_products_comments `
      );

    res.status(200).json({ status: "success", data: comments.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const fetchPostsComments = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const comments = await pool
      .request()
      .query(
        `SELECT pc.id, pc.user_id, u.user_avatar, u.user_fullname, u.username, pc.post_id, pc.content FROM posts_comments pc join users u ON u.id = pc.user_id ORDER BY pc.id DESC`
      );

    res.status(200).json({ status: "success", data: comments.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const fetchNewsComments = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const comments = await pool
      .request()
      .query(
        `SELECT nc.id, nc.user_id, nc.created_at, u.user_avatar, u.user_fullname, u.username, nc.news_id, nc.content FROM news_comments nc join users u ON u.id = nc.user_id ORDER BY nc.created_at DESC`
      );

    res.status(200).json({ status: "success", data: comments.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const fetchBlogsComments = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const comments = await pool
      .request()
      .query(
        `SELECT bc.id, bc.user_id, bc.created_at, u.user_avatar, u.user_fullname, u.username, bc.blog_id, bc.content FROM blogs_comments bc JOIN users u ON u.id = bc.user_id ORDER BY bc.created_at DESC`
      );

    res.status(200).json({ status: "success", data: comments.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

// //delete a comment using id
// export const deletecomment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     let pool = sql.connect(config.sql);
//     const comment = await pool
//       .request()
//       .input("id", sql.Int, id)
//       .query(`SELECT * FROM business_comments WHERE id = @id`);
//     const isComment = comment.recordset[0];
//     if (!isComment) {
//       return res
//         .status(404)
//         .json({ status: "error", error: "comment does not exists" });
//     } else {
//       await pool
//         .request()
//         .input("id", sql.Int, id)
//         .query(`DELETE FROM business_comments WHERE id = @id`);
//       res
//         .status(200)
//         .json({ status: "success", message: "comment deleted successfully" });
//     }
//   } catch (error) {
//     res.status(404).json({ status: "error", error: error.message });
//   }
// };
// export const fetchComment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     let pool = sql.connect(config.sql);
//     const comment = await pool
//       .request()
//       .input("id", sql.Int, id)
//       .query(`SELECT * FROM business_comments WHERE id = @id`);
//     const isComment = comment.recordset[0];
//     if (!isComment) {
//       return res
//         .status(404)
//         .json({ status: "error", error: "comment does not exists" });
//     } else {
//       res.status(200).json({ status: "success", data: isComment });
//     }
//   } catch (error) {
//     res.status(404).json({ status: "error", error: error.message });
//   }
// };

//Update comment per id
export const updateNewsComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    let pool = sql.connect(config.sql);
    const comment = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM news_comments WHERE id = @id`);
    const isComment = comment.recordset[0];
    if (!isComment) {
      return res
        .status(404)
        .json({ status: "error", error: "comment does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("content", sql.VarChar, content)
        .query(`UPDATE news_comments SET  content = @content WHERE id = @id`);
      res
        .status(200)
        .json({ status: "success", message: "comment update was successful" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const updateBlogsComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    let pool = sql.connect(config.sql);
    const comment = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM blogs_comments WHERE id = @id`);
    const isComment = comment.recordset[0];
    if (!isComment) {
      return res
        .status(404)
        .json({ status: "error", error: "comment does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("content", sql.VarChar, content)
        .query(`UPDATE blogs_comments SET  content = @content WHERE id = @id`);
      res
        .status(200)
        .json({ status: "success", message: "comment update was successful" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const updateProductsComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    let pool = sql.connect(config.sql);
    const comment = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM products_comments WHERE id = @id`);
    const isComment = comment.recordset[0];
    if (!isComment) {
      return res
        .status(404)
        .json({ status: "error", error: "comment does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("content", sql.VarChar, content)
        .query(
          `UPDATE products_comments SET  content = @content WHERE id = @id`
        );
      res
        .status(200)
        .json({ status: "success", message: "comment update was successful" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const updateBusinessComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    let pool = sql.connect(config.sql);
    const comment = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM business_comments WHERE id = @id`);
    const isComment = comment.recordset[0];
    if (!isComment) {
      return res
        .status(404)
        .json({ status: "error", error: "comment does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("content", sql.VarChar, content)
        .query(
          `UPDATE business_comments SET  content = @content WHERE id = @id`
        );
      res
        .status(200)
        .json({ status: "success", message: "comment update was successful" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const updatePostsComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    let pool = sql.connect(config.sql);
    const comment = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM posts_comments WHERE id = @id`);
    const isComment = comment.recordset[0];
    if (!isComment) {
      return res
        .status(404)
        .json({ status: "error", error: "comment does not exists" });
    } else {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("content", sql.VarChar, content)
        .query(`UPDATE posts_comments SET  content = @content WHERE id = @id`);
      res
        .status(200)
        .json({ status: "success", message: "comment update was successful" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
