import sql from "mssql";
import config from "../db/config.js";

export const search = async (req, res) => {
  const { search } = req.params;
  let loop = await sql.connect(config.sql);

  try {
    const products = await loop.request().query(
      `SELECT p.product_name,
                p.id,
                p.product_image,
                p.product_description,
                b.b_name,
                u.user_location,
                u.user_fullname
            FROM
                business_products p 
                JOIN businesses b ON b.id = p.business_id
                JOIN users u ON u.id = p.user_id
            WHERE 
                p.product_name LIKE '%${search}%' 
                OR u.user_location LIKE '%${search}%'
                OR p.product_description LIKE '%${search}%'`
    );
    const businesses = await loop.request().query(
      `SELECT b.b_name,
                b.id,
                b.b_image,
                b.b_message,
                u.user_location,
                b.b_description,
                u.user_fullname
            FROM
                businesses b 
                JOIN users u ON u.id = b.user_id 
            WHERE 
                b.b_name LIKE '%${search}%' 
                OR 
                b.b_description LIKE '%${search}%' 
                OR 
                u.user_location LIKE '%${search}%' 
                OR 
                u.user_fullname LIKE '%${search}%'`
    );
    const posts = await loop.request().query(
      `SELECT p.content,
              p.created_at,
              p.id,
              p.image,
              u.user_fullname,
              u.username,
              u.user_location
            FROM
              posts p JOIN users u ON u.id = p.user_id
            WHERE 
              p.content LIKE '%${search}%' OR u.username LIKE '%${search}%' OR u.user_location LIKE '%${search}%' OR u.user_fullname LIKE '%${search}%'`
    );
    const users = await loop.request().query(
      `SELECT                
            u.user_fullname,
            u.username,
            u.id,
            u.user_location,
            u.user_avatar
          FROM users u
            WHERE 
              u.user_fullname LIKE '%${search}%' 
              OR u.username LIKE '%${search}%' 
              OR u.user_location LIKE '%${search}%'
                `
    );
    const news = await loop.request().query(
      `SELECT        
            news_id,        
            news_title,
            news_area,
            news_image,
            news_reporter_id,
            news_category,
            u.user_fullname,
            u.user_avatar,
            news_content
          FROM marketnews m JOIN users u ON u.id = news_reporter_id
            WHERE 
            news_title LIKE '%${search}%'OR
            news_area LIKE '%${search}%'OR
            news_category LIKE '%${search}%'OR
            news_content LIKE '%${search}%'`
    );
    const blogs = await loop.request().query(
      `SELECT                
            b.title,
            b.content,
            b.image,
            b.user_id,
            b.id,
            u.user_fullname
          FROM blogs b JOIN users u ON u.id = b.user_id
            WHERE 
              b.title LIKE '%${search}%' 
              OR b.content LIKE '%${search}%'`
    );

    res.status(200).json({
      status: "success",
      data: {
        products: products.recordset,
        businesses: businesses.recordset,
        posts: posts.recordset,
        users: users.recordset,
        blogs: blogs.recordset,
        news: news.recordset,
      },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const storeUserSearch = async (req, res) => {
  let pool = await sql.connect(config);
  const { search, user_id, search_location, id, created_at } = req.body;

  try {
    const result = await pool
      .request()
      .input("search", sql.VarChar, search)
      .query(`SELECT search FROM user_search WHERE search = @search`);

    if (result?.recordset?.length === 0) {
      await pool
        .request()
        .input("search", sql.VarChar, search)
        .input("id", sql.VarChar, id)
        .input("user_id", sql.VarChar, user_id)
        .input("created_at", sql.VarChar, created_at)
        .input("search_location", sql.VarChar, search_location)
        .query(
          `INSERT INTO user_search(user_id, search_location, id, created_at, search) VALUES(@user_id, @search_location, @id, @created_at, @search)`
        );
      res
        .status(200)
        .json({ status: "succes", message: "Search is Stored successfully" });
    } else {
      return res.status(404).json({
        status: "failed",
        message: "Search is Present",
        data: result.recordset,
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", message: error?.message });
  }
};

export const fetchAllSearch = async (req, res) => {
  let pool = await sql.connect(config);

  try {
    const result = await pool
      .request()
      .query(
        `SELECT us.user_id, us.search_location, us.id, us.created_at, us.search, u.user_fullname, u.user_location, u.user_avatar, b.b_name, b.b_image FROM user_search us JOIN users u ON u.id = us.user_id JOIN businesses b ON b.user_id = us.user_id ORDER BY us.created_at DESC`
      );
    res.status(200).json({ status: "success", data: result.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", message: error?.message });
  }
};
