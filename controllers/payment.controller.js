import sql from "mssql";
import config from "../db/config.js";

export const createOrder = async (req, res) => {
  let pool = await sql.connect(config);
  const {
    orderId,
    orderProductId,
    orderUserId,
    orderProductQuantity,
    orderBusinessId,
    orderAmount,
    orderBusinessOwnerState,
    createdAt,
  } = req.body;
  try {
    const order = await pool
      .request()
      .input("orderId", sql.VarChar, orderId)
      .query(`SELECT * FROM orders WHERE orderId = @orderId`);
    if (!order.recordset[0]) {
      await pool
        .request()
        .input("orderId", sql.VarChar, orderId)
        .input("orderProductId", sql.VarChar, orderProductId)
        .input("orderUserId", sql.VarChar, orderUserId)
        .input("orderProductQuantity", sql.Int, orderProductQuantity)
        .input("orderBusinessId", sql.VarChar, orderBusinessId)
        .input("orderAmount", sql.VarChar, orderAmount)
        .input("orderBusinessOwnerState", sql.Bit, orderBusinessOwnerState)
        .input("createdAt", sql.VarChar, createdAt).query(`INSERT INTO orders(
                  orderId,
                  orderProductId,
                  orderUserId,
                  orderProductQuantity,
                  orderBusinessId,
                  orderAmount,
                  orderBusinessOwnerState,
                  createdAt
                )
                VALUES(
                  @orderId,
                  @orderProductId,
                  @orderUserId,
                  ${orderProductQuantity},
                  @orderBusinessId,
                  @orderAmount,
                  ${orderBusinessOwnerState},
                  @createdAt
                )
      `);
    }
    res
      .status(200)
      .json({ status: "success", message: "Order placed Successfully" });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const getOrders = async (req, res) => {
  let pool = await sql.connect(config);
  try {
    const orders = await pool.request().query(`
          SELECT 
            o.orderId,
            o.orderProductId,
            o.orderUserId,
            o.orderProductQuantity,
            o.orderBusinessId,
            o.orderAmount,
            o.orderBusinessOwnerState,
            o.orderOfflinePayment,
            o.orderOnlinePayment,
            bp.product_image,
            b.b_image,
            u.user_avatar,
            u.user_location,
            u.user_fullname,
            bp.product_name,
            b.b_name,
            o.createdAt 
          FROM orders o 
            JOIN users u ON u.id = o.orderUserId
            JOIN businesses b ON b.id = o.orderBusinessId
            JOIN business_products bp ON bp.id = o.orderProductId 
          ORDER BY o.createdAt DESC`);

    res.status(200).json({ status: "success", data: orders.recordset });
  } catch (error) {
    res.status(404).json({ status: "error", message: error });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  let pool = await sql.connect(config);
  try {
    await pool.request().input("orderId", sql.VarChar, orderId).query(`
          DELETE FROM orders`);
    res.status(200).json({ status: "success", message: "Delete Successfull" });
  } catch (error) {
    res.status(404).json({ status: "Error", message: error?.message });
  }
};
