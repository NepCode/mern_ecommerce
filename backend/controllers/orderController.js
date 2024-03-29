import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Fetch all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10
  const page = Number(req.query.pageNumber) || 1

  const count = await Order.countDocuments()
  const orders = await Order.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ orders, page, pages: Math.ceil(count / pageSize) })
})


// @desc    Fetch logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  
  const pageSize = Number(req.query.pageSize) || 10
  const page = Number(req.query.pageNumber) || 1

  const count = await Order.countDocuments({ user: req.user.id })
  const orders = await Order.find({ user: req.user.id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ orders, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single order
// @route   GET /api/v1/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})



// @desc    Create a order
// @route   POST /api/v1/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {

  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if( orderItems && orderItems.length === 0 ) {
    res.status(400)
    throw new Error('No order items found')
    return
  } else {

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Update a order
// @route   PUT /api/v1/orders/:id
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if(!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  order.set(req.body);
  const updatedProduct = await order.save();
  return res.json(updatedProduct)
  
})

// @desc    Delete a order
// @route   DELETE /api/v1/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    await order.remove()
    res.json({ message: 'Order removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id)

  if (order) {

    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()

    res.json(updatedOrder)

  } else {

    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  getOrders,
  getOrderById,
  deleteOrder,
  createOrder,
  updateOrder,
  updateOrderToPaid,
  getMyOrders
}