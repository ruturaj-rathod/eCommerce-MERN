const Order = require("../models/orderModel");
const Product = require("../models/peoductModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    order.orderItems.forEach(async (order) => {
        await UpdateStock(order.product, order.quantity, 1);
    });

    res.status(201).json({
        success: true,
        order
    });
});

exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {

    try {
        const order = await Order.findById(req.params.id);
        if (order.orderStatus !== "Delivered") {
            await order.remove();

            order.orderItems.forEach(async (order) => {
                await UpdateStock(order.product, order.quantity, 0);
            });

            res.status(200).json({
                success: true,
                message: "Order has been canceled successfully"
            });
        } else {
            res.status(200).json({
                success: false,
                message: "Order Has been already delivered"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "No order exist with this id"
        })
    }
});

//Get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler(`Order not found with id ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        order
    });
});


//Get login user orders
exports.getOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });
});

//Get All  orders (admin)
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

//update order status (admin)
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with id ${req.params.id}`, 400));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (order.orderStatus === "Shipped") {
        // order.orderItems.forEach( async (order) => {
        //     await UpdateStock(order.product, order.quantity);
        // });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

async function UpdateStock(id, quantity, flag) {
    const product = await Product.findById(id);

    if(flag === 1) {
        product.stock -= quantity;
    } else if (flag === 0) {
        product.stock += quantity;
    }

    await product.save({ validateBeforeSave: false });
}

//Delete order (admin)
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with id ${req.params.id}`, 400));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});