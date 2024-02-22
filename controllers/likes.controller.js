import sql from "mssql";
import config from "../db/config.js";

//////////////////////////////////////////////////////
///CREATE  Section Likes
export const createBusinessLike = async (req, res) => {
  const { user_id, business_id, liked, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const user_like = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("business_id", sql.VarChar, business_id)
      .input("id", sql.VarChar, id)
      .query(
        `SELECT * FROM business_likes WHERE business_id = @business_id  AND user_id = @user_id AND liked = 1`
      );
    if (user_like.recordset.length === 0) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("liked", sql.Bit, liked)
        .input("business_id", sql.VarChar, business_id)
        .input("user_id", sql.VarChar, user_id)
        .query(`INSERT INTO business_likes(
              id,
              user_id,
              liked,
              business_id
          ) VALUES(
              @id,
              @user_id,
              @liked,
              @business_id) `);
      res.status(201).json({
        status: "success",
        message: "Your like was successfull",
      });
    } else {
      res.status(404).json({
        status: "success",
        message: "You've already liked the business",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createPostLike = async (req, res) => {
  const { user_id, post_id, liked, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const user_like = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("post_id", sql.VarChar, post_id)
      .input("id", sql.Int, id)
      .query(
        `SELECT * FROM posts_likes WHERE post_id = @post_id  AND user_id = @user_id`
      );
    if (user_like.recordset.length === 0) {
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("liked", sql.Bit, liked)
        .input("post_id", sql.VarChar, post_id)
        .input("user_id", sql.VarChar, user_id).query(`INSERT INTO posts_likes(
              id,
              user_id,
              liked,
              post_id
          ) VALUES(
              ${id},
              @user_id,
              @liked,
              @post_id) `);
      res.status(201).json({
        status: "success",
        message: "Your like was successfull",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User already like successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createProductLike = async (req, res) => {
  const { user_id, product_id, liked, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const user_like = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("product_id", sql.VarChar, product_id)
      .input("id", sql.Int, id)
      .query(
        `SELECT * FROM products_likes WHERE  product_id = @product_id  AND user_id = @user_id`
      );
    if (user_like.recordset.length === 0) {
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("liked", sql.Bit, liked)
        .input("product_id", sql.VarChar, product_id)
        .input("user_id", sql.VarChar, user_id)
        .query(`INSERT INTO products_likes(
              id,
              user_id,
              liked,
              product_id
          ) VALUES(
              ${id},
              @user_id,
              @liked,
              @product_id) `);
      res.status(201).json({
        status: "success",
        message: "Your like was successfull",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User already like successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createNewsLike = async (req, res) => {
  const { user_id, news_id, liked, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const user_like = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("news_id", sql.VarChar, news_id)
      .input("id", sql.VarChar, id)
      .query(
        `SELECT * FROM news_likes WHERE  news_id = @news_id  AND user_id = @user_id`
      );
    if (user_like.recordset.length === 0) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("liked", sql.Bit, liked)
        .input("news_id", sql.VarChar, news_id)
        .input("user_id", sql.VarChar, user_id).query(`INSERT INTO news_likes(
              id,
              user_id,
              liked,
              news_id
          ) VALUES(
              @id,
              @user_id,
              @liked,
              @news_id) `);
      res.status(201).json({
        status: "success",
        message: "Your like was successfull",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User already like successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const createBlogLike = async (req, res) => {
  const { user_id, blog_id, liked, id } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const user_like = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("blog_id", sql.VarChar, blog_id)
      .input("id", sql.Int, id)
      .query(
        `SELECT * FROM blogs_likes WHERE  blog_id = @blog_id  AND user_id = @user_id`
      );
    if (user_like.recordset.length === 0) {
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("liked", sql.Bit, liked)
        .input("blog_id", sql.VarChar, blog_id)
        .input("user_id", sql.VarChar, user_id).query(`INSERT INTO blogs_likes(
              id,
              user_id,
              liked,
              blog_id
          ) VALUES(
              ${id},
              @user_id,
              @liked,
              @blog_id) `);
      res.status(201).json({
        status: "success",
        message: "Your like was successfull",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User already like successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//////////////////////////////////////////////////////
///GET all  Likes Section
export const getBusinessLikes = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const likes = await pool
      .request()
      .query(
        `SELECT bl.id, bl.user_id, bl.business_id, bl.liked, u.user_fullname, u.username, u.user_avatar FROM  business_likes bl JOIN users u ON u.id = bl.user_id ORDER BY bl.id ASC`
      );
    res.status(201).json({
      status: "success",
      data: likes.recordset,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const getPostsLikes = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const likes = await pool
      .request()
      .query(
        `SELECT pl.id, pl.user_id, pl.post_id, pl.liked, u.user_fullname, u.username, u.user_avatar FROM  posts_likes pl JOIN users u ON u.id = pl.user_id`
      );
    res.status(201).json({
      status: "success",
      data: likes.recordset,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const getProductsLikes = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const likes = await pool
      .request()
      .query(
        `SELECT pl.id, pl.product_id, pl.liked, pl.user_id, u.user_fullname, u.user_avatar, u.username FROM  products_likes pl JOIN users u ON u.id = pl.user_id`
      );
    res.status(201).json({
      status: "success",
      data: likes.recordset,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const getNewsLikes = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const likes = await pool
      .request()
      .query(
        `SELECT nl.id, nl.news_id, nl.liked, nl.user_id, u.user_fullname, u.user_avatar, u.username FROM  news_likes nl JOIN users u ON u.id = nl.user_id`
      );
    res.status(201).json({
      status: "success",
      data: likes.recordset,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const getBlogsLikes = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const likes = await pool
      .request()
      .query(
        `SELECT bl.id, bl.blog_id, bl.liked, bl.user_id, u.user_fullname, u.user_avatar, u.username FROM  blogs_likes bl JOIN users u ON u.id = bl.user_id`
      );
    res.status(201).json({
      status: "success",
      data: likes.recordset,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
//One user loves not complete for now later to be used for another purpose
export const fetchBusinessLike = async (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const user_like = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("id", sql.Int, id)
      .query(
        `SELECT * FROM business_likes WHERE id = ${id}  AND user_id = ${user_id}`
      );
    res.status(201).json({
      status: "success",
      data: user_like,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//////////////////////////////////////////////////////
///DELETE Section for Likes
export const deleteBusinessLike = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM business_likes WHERE id = @id`);
    if (user_like.recordset) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .query(`DELETE FROM business_likes WHERE id = @id`);
      res.status(201).json({
        status: "success",
        message: "Delete of like was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const deletePostLike = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM posts_likes WHERE id = @id`);
    if (user_like.recordset) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .query(`DELETE FROM posts_likes WHERE id = @id`);
      res.status(201).json({
        status: "success",
        message: "Delete of like was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const deleteProductLike = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM products_likes WHERE id = @id`);
    if (user_like.recordset) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .query(`DELETE FROM products_likes WHERE id = @id`);
      res.status(201).json({
        status: "success",
        message: "Delete of like was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const deleteBlogsLike = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM blogs_likes WHERE id = ${id}`);
    if (user_like.recordset) {
      await pool
        .request()
        // .input("id", sql.VarChar, id)
        .query(`DELETE FROM blogs_likes WHERE id = ${id} `);
      res.status(201).json({
        status: "success",
        message: "Delete of like was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//////////////////////////////////////////////////////
///Update Section for Likes
export const updateBusinessLikes = async (req, res) => {
  const { user_id, business_id, liked } = req.body;
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM business_likes WHERE id = @id`);
    if (user_like.recordset) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("user_id", sql.VarChar, user_id)
        .input("business_id", sql.VarChar, business_id)
        .input("liked", sql.Bit, liked)
        .query(
          `UPDATE business_likes SET liked= ${liked}, user_id= @user_id, business_id= @business_id WHERE id = @id`
        );
      res.status(201).json({
        status: "success",
        message: "Update of likes was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const updatePostLikes = async (req, res) => {
  const { user_id, post_id, liked } = req.body;
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM posts_likes WHERE id = ${id}`);
    if (user_like.recordset) {
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("user_id", sql.VarChar, user_id)
        .input("post_id", sql.VarChar, post_id)
        .input("liked", sql.Bit, liked)
        .query(
          `UPDATE posts_likes SET liked= ${liked}, user_id= @user_id, post_id= @post_id WHERE id = ${id}`
        );
      res.status(201).json({
        status: "success",
        message: "Update of likes was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const updateProductLikes = async (req, res) => {
  const { user_id, product_id, liked } = req.body;
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM products_likes WHERE id = @id`);
    if (user_like.recordset) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("user_id", sql.VarChar, user_id)
        .input("product_id", sql.VarChar, product_id)
        .input("liked", sql.Bit, liked)
        .query(
          `UPDATE products_likes SET liked= ${liked}, user_id= @user_id, product_id= @product_id WHERE id = @id`
        );
      res.status(201).json({
        status: "success",
        message: "Update of likes was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const updateNewsLikes = async (req, res) => {
  const { user_id, news_id, liked } = req.body;
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM news_likes WHERE id = @id`);
    if (user_like.recordset) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("user_id", sql.VarChar, user_id)
        .input("news_id", sql.VarChar, news_id)
        .input("liked", sql.Bit, liked)
        .query(
          `UPDATE news_likes SET liked= ${liked}, user_id= @user_id, news_id= @news_id WHERE id = @id`
        );
      res.status(201).json({
        status: "success",
        message: "Update of likes was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
export const updateBlogLikes = async (req, res) => {
  const { user_id, blog_id, liked } = req.body;
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const user_like = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM blogs_likes WHERE id = ${id}`);
    if (user_like.recordset) {
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("user_id", sql.VarChar, user_id)
        .input("blog_id", sql.VarChar, blog_id)
        .input("liked", sql.Bit, liked)
        .query(
          `UPDATE blogs_likes SET liked = ${liked}, user_id = @user_id, blog_id = @blog_id WHERE id = ${id}`
        );
      res.status(201).json({
        status: "success",
        message: "Update of likes was successfull",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
