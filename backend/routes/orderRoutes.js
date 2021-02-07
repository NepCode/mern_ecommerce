import express from 'express'
const router = express.Router()
import {
  getOrders,
  getOrderById,
  deleteOrder,
  createOrder,
  updateOrder,
  updateOrderToPaid,
  getMyOrders
} from '../controllers/orderController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').get(protect,admin,getOrders).post(protect,createOrder)
router.route('/myorders').get(protect,getMyOrders)
router
  .route('/:id')
  .get(protect,getOrderById)
  .delete(protect,admin,deleteOrder)
  .put(protect,admin,updateOrder)
  
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router