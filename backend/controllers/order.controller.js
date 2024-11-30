import orderModel from "../models/order.model.js"
import userModel from "../models/user.model.js"
import AppError from "../utils/error.utils.js"
import Stripe from 'stripe'
import razorpay from 'razorpay'

// global variables
const currency = 'AED'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Placing orders using COD
const placeOrder = async (req, res, next) => {

    try {
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.status(200).json({
            success:true,
            message:"Order Placed"
        })
    } catch (error) {
        return next(new AppError(error.message, 500)); 
    }

}

// Placing orders using Stripe
const placeOrderStripe = async (req, res, next) => {
   try {

    const {userId, items, amount, address} = req.body
    const { origin } = req.headers

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment:false,
      date:Date.now()
  }

  const newOrder = new orderModel(orderData)
  await newOrder.save()

  const line_items = items.map((item)=>({
    price_data: {
      currency:currency,
      product_data: {
        name:item.name
      },
      unit_amount: item.price * 100
    },
    quantity: item.quantity
  }))

  line_items.push({
    price_data: {
      currency:currency,
      product_data:{
        name:'Delivery Charges'
      },
      unit_amount: deliveryCharge * 100
    },
    quantity: 1
  })
    
  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode:'payment',
  })
   
  res.status(200).json({
    success:true,
    session_url:session.url
  })

   } catch (error) {
    return next(new AppError(error.message, 500)); 
   }
}

// verify stripe
const verifyStripe = async (req, res, next) => {

  const {orderId, success, userId} = req.body

  try {
    if(success == 'true'){
      await orderModel.findByIdAndUpdate(orderId, {payment:true})
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({success:true})
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    return next(new AppError(error.message, 500)); 
  }
}

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res, next) => {
  try {
    const {userId, items, amount, address} = req.body

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment:false,
      date:Date.now()
  }

  const newOrder = new orderModel(orderData)
  await newOrder.save()

  const options = {
    amount: amount * 100,
    currency: currency.toUpperCase(),
    receipt: newOrder._id.toString()
  }

  await razorpayInstance.orders.create(options, (error,order)=>{
    if(error){
      console.log(error)
      return res.json({success:false, message: error})
    }else{
      res.json({success:true,order})
    }
  })

  } catch (error) {
   return next(new AppError(error.message, 500)); 
  }
}

// Verify razorpay
const verifyRazorpay = async(req,res,next) => {
  try {
    
    const {userId, razorpay_order_id} = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
      await userModel.findByIdAndUpdate(userId, {cartData:{}})

      res.status(200).json({
        success:true,
        message:"Payment successful"
    })
    }else{res.json({
      success:false,
      message:"Payment failed"
  })}


  } catch (error) {
    return next(new AppError(error.message, 500)); 
  }
}

// All orders data for Admin panel
const allOrders = async (req, res, next) => {
  try {
    
    const orders = await orderModel.find({})

    res.status(200).json({
        success:true,
        orders
    })
  } catch (error) {
    return next(new AppError(error.message, 500)); 
  }
}

// User order data for frontend
const userOrders = async (req, res, next) => {
  try {
    
    const {userId} = req.body

    const orders = await orderModel.find({userId})

    res.status(200).json({
        success:true,
        orders
    })

  } catch (error) {
    return next(new AppError(error.message, 500)); 
  }
}

// Update order status from Admin Panel
const updateStatus = async (req, res, next) => {
  try {

    const {orderId, status} = req.body

    await orderModel.findByIdAndUpdate(orderId, {status})

    res.status(200).json({
      success:true,
      message:'Status Updated'
    })
    
  } catch (error) {
    return next(new AppError(error.message, 500)); 
  }
}

export {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyRazorpay
}