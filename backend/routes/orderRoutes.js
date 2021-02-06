import express from 'express'
const router = express.Router()
import {
  getOrders,
  getOrderById,
  deleteOrder,
  createOrder,
  updateOrder,
  updateOrderToPaid
} from '../controllers/orderController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').get(getOrders).post(protect,createOrder)
router
  .route('/:id')
  .get(protect,getOrderById)
  .delete(protect,admin,deleteOrder)
  .put(protect,admin,updateOrder,updateOrderToPaid)

export default router