import sql from "mssql";
import config from "../db/config.js";

//Create Posts
export const reportNews = async (req, res) => {
  const {
    news_id,
    news_reporter_id,
    news_title,
    news_area,
    news_category,
    news_content,
    news_image,
    news_video,
    news_document,
    news_any_comments,
    created_at,
    updated_at,
  } = req.body;
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("news_id", sql.VarChar, news_id)
      .input("news_reporter_id", sql.VarChar, news_reporter_id)
      .input("news_title", sql.VarChar, news_title)
      .input("news_area", sql.VarChar, news_area)
      .input("news_category", sql.VarChar, news_category)
      .input("news_content", sql.VarChar, news_content)
      .input("news_image", sql.VarChar, news_image)
      .input("news_video", sql.VarChar, news_video)
      .input("news_document", sql.VarChar, news_document)
      .input("news_any_comments", sql.VarChar, news_any_comments)
      .input("created_at", sql.VarChar, created_at)
      .input("updated_at", sql.VarChar, updated_at)
      .query(`INSERT INTO marketnews(
            news_id,
            news_reporter_id,
            news_title,
            news_area,
            news_category,
            news_content,
            news_image,
            news_any_comments,
            created_at,
            updated_at
        ) VALUES(
            @news_id,
            @news_reporter_id,
            @news_title,
            @news_area,
            @news_category,
            @news_content,
            @news_image,
            @news_any_comments,
            @created_at,
            @updated_at) `);
    res
      .status(201)
      .json({ status: "success", message: "News Posted successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

//Update Post per id
export const updateNews = async (req, res) => {
  const { news_id } = req.params;
  const {
    news_title,
    news_area,
    news_category,
    news_content,
    news_image,
    updated_at,
  } = req.body;
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    const post = await pool
      .request()
      .input("news_id", sql.VarChar, news_id)
      .query(`SELECT * FROM marketnews WHERE news_id = @news_id`);
    const isNews = post.recordset[0];
    if (!isNews) {
      return res
        .status(404)
        .json({ status: "error", error: "News does not exists" });
    } else {
      //connect to database
      const pool = await sql.connect(config.sql);
      await pool
        .request()
        .input("news_id", sql.VarChar, news_id)
        .input("news_title", sql.VarChar, news_title)
        .input("news_area", sql.VarChar, news_area)
        .input("news_category", sql.VarChar, news_category)
        .input("news_content", sql.VarChar, news_content)
        .input("news_image", sql.VarChar, news_image)
        .input("updated_at", sql.VarChar, updated_at)
        .query(
          `UPDATE marketnews SET 
                news_title = @news_title, 
                news_area = @news_area 
                news_category = @news_category 
                news_content = @news_content 
                news_image = @news_image 
                updated_at = @updated_at 
            WHERE news_id = @news_id`
        );
      res.status(201).json({
        status: "success",
        message: "news updated successfully",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//get all posts
export const fetchNews = async (req, res) => {
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    const news = await pool.request().query(
      `SELECT 
        mn.news_id,
        mn.news_reporter_id,
        mn.news_title,
        mn.news_area,
        mn.news_category,
        mn.news_content,
        mn.news_image,
        mn.news_video,
        mn.news_document,
        mn.news_any_comments,
        mn.created_at,
        mn.updated_at,
        u.user_fullname,
        u.user_avatar,
        u.user_location
        FROM marketnews mn JOIN users u ON u.id = mn.news_reporter_id`
    );
    res.status(201).json({
      status: "success",
      data: news.recordset,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

//delete a post using id
export const deleteNews = async (req, res) => {
  const { news_id } = req.params;
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    const news = await pool
      .request()
      .input("news_id", sql.VarChar, news_id)
      .query(`SELECT * FROM marketnews WHERE news_id = @news_id`);
    const isNews = news.recordset[0];
    if (!isNews) {
      return res
        .status(404)
        .json({ status: "error", error: "Post does not exists" });
    } else {
      //connect to database
      const pool = await sql.connect(config.sql);
      await pool
        .request()
        .input("news_id", sql.VarChar, news_id)
        .query(`DELETE FROM marketnews WHERE news_id = @news_id`);
      res
        .status(200)
        .json({ status: "success", message: "News deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
//get single post using news_id
export const getNews = async (req, res) => {
  const { news_id } = req.params;
  try {
    //connect to database
    const pool = await sql.connect(config.sql);
    const news = await pool
      .request()
      .input("news_id", sql.VarChar, news_id)
      .query(`SELECT * FROM marketnews WHERE news_id = @news_id`);
    const isNews = news.recordset[0];
    if (!isNews) {
      return res
        .status(404)
        .json({ status: "error", error: "Post does not exists" });
    } else {
      //connect to database
      const pool = await sql.connect(config.sql);
      const news = await pool.request().input("news_id", sql.VarChar, news_id)
        .query(` 
            SELECT 
                mn.news_id,
                mn.news_reporter_id,
                mn.news_title,
                mn.news_area,
                mn.news_category,
                mn.news_content,
                mn.news_image,
                mn.news_video,
                mn.news_document,
                mn.news_any_comments,
                mn.created_at,
                mn.updated_at,
                u.user_fullname,
                u.user_avatar,
                u.user_location
            FROM marketnews mn 
            JOIN users u 
            ON u.id = p.news_reporter_id 
            WHERE news_id = @news_id
        `);
      res.status(200).json({ status: "success", data: news });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};
