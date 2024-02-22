import sql from "mssql";
import config from "../db/config.js";

export const getPlans = async (req, res) => {
  let pool = await sql.connect(config);
  try {
    const plans = await pool.request().query(`SELECT * FROM plans ORDER BY id`);
    res.status(200).json({ status: "success", data: plans.recordset });
  } catch (error) {
    res.status(404).json({ status: "failed", message: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  let pool = await sql.connect(config);
  try {
    const plans = await pool.request().query(`SELECT * FROM plans ORDER BY id`);
    res.status(200).json({ status: "success", data: plans.recordset });
  } catch (error) {
    res.status(404).json({ status: "failed", message: error.message });
  }
};
export const getUserPlans = async (req, res) => {
  let pool = await sql.connect(config);
  try {
    const plans = await pool
      .request()
      .query(
        `SELECT up.id, up.user_id, up.plan_id, up.plan_type, up.plan_ends, up.created_at, u.user_fullname, u.user_avatar, u.created_at AS user_created_at FROM user_plan up JOIN users u ON u.id = up.user_id ORDER BY id`
      );
    res.status(200).json({ status: "success", data: plans.recordset });
  } catch (error) {
    res.status(404).json({ status: "failed", message: error.message });
  }
};

export const planSurvey = async (req, res) => {
  try {
    const {
      id,
      user_id,
      plan_id,
      user_business_email,
      user_business_phone,
      user_preferred_num_widgets,
      user_preferred_audience,
      user_preferred_coverage,
      user_preferred_sales_mode,
      user_additional_comments,
      user_willing_price,
      user_news_preference,
      created_at,
    } = req.body;
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .query(`SELECT user_id FROM plan_registration WHERE user_id = @user_id`);

    if (result.recordset?.length === 0) {
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("user_id", sql.VarChar, user_id)
        .input("plan_id", sql.VarChar, plan_id)
        .input("user_business_email", sql.VarChar, user_business_email)
        .input("user_business_phone", sql.VarChar, user_business_phone)
        .input(
          "user_preferred_num_widgets",
          sql.VarChar,
          user_preferred_num_widgets
        )
        .input("user_preferred_audience", sql.VarChar, user_preferred_audience)
        .input("user_preferred_coverage", sql.VarChar, user_preferred_coverage)
        .input(
          "user_preferred_sales_mode",
          sql.VarChar,
          user_preferred_sales_mode
        )
        .input(
          "user_additional_comments",
          sql.VarChar,
          user_additional_comments
        )
        .input("user_willing_price", sql.VarChar, user_willing_price)
        .input("user_news_preference", sql.VarChar, user_news_preference)
        .input("created_at", sql.VarChar, created_at)
        .query(`INSERT INTO plan_registration(
                id,
                user_id,
                plan_id,
                user_business_email,
                user_business_phone,
                user_preferred_num_widgets,
                user_preferred_audience,
                user_preferred_coverage,
                user_preferred_sales_mode,
                user_additional_comments,
                user_willing_price,
                user_news_preference,
                created_at) VALUES(
                  @id,
                  @user_id,
                  @plan_id,
                  @user_business_email,
                  @user_business_phone,
                  @user_preferred_num_widgets,
                  @user_preferred_audience,
                  @user_preferred_coverage,
                  @user_preferred_sales_mode,
                  @user_additional_comments,
                  @user_willing_price,
                  @user_news_preference,
                  @created_at
                )`);

      res.status(200).json({
        status: "success",
        message: "Thanks so much, Your Submission Was successful.",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "You have already Submitted Your Survey.",
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", message: error?.message });
  }
};
export const surveyPlans = async (req, res) => {
  let pool = await sql.connect(config);
  try {
    const result = await pool.request().query(`SELECT 
    pr.id,
    pr.user_id,
    pr.plan_id,
    pr.user_business_email,
    pr.user_business_phone,
    pr.user_preferred_num_widgets,
    pr.user_preferred_audience,
    pr.user_preferred_coverage,
    pr.user_preferred_sales_mode,
    pr.user_additional_comments,
    pr.user_willing_price,
    pr.user_news_preference,
    pr.created_at,
    u.user_fullname,
    u.user_avatar,
    u.user_location,
    p.plan_type  
    FROM plan_registration pr JOIN users u ON u.id = pr.user_id JOIN plans p ON p.id = pr.plan_id ORDER BY pr.id DESC`);

    res.status(200).json({ status: "success", data: result.recordset });
  } catch (error) {
    res.status(404).json({ success: "error", message: error });
  }
};

export const createUserPlan = async (req, res) => {
  const { id, user_id, plan_id, plan_type, plan_ends, created_at } = req.body;
  let pool = await sql.connect(config);
  try {
    const plan = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("plan_type", sql.VarChar, plan_type)
      .query(
        `SELECT * FROM user_plan WHERE plan_type = @plan_type OR user_id = @user_id`
      );

    if (!plan.recordset[0]) {
      await pool
        .request()
        .input("user_id", sql.VarChar, user_id)
        .input("plan_id", sql.VarChar, plan_id)
        .input("plan_type", sql.VarChar, plan_type)
        .input("plan_ends", sql.VarChar, plan_ends)
        .input("created_at", sql.VarChar, created_at)
        .input("id", sql.VarChar, id)
        .query(
          `INSERT INTO user_plan(id, user_id, plan_id, plan_type, plan_ends,created_at)  
          VALUES(@id, @user_id, @plan_id, @plan_type, @plan_ends, @created_at)`
        );

      res.status(200).json({
        status: "success",
        message: "Plan Created Successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Plan Already Exist", data: plan });
    }
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};
