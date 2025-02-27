const Product = require("../models/peoductModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary');

//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.url
        })
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;
    req.body.options = JSON.parse(req.body.options);

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});


//Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 8;

    const ApiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await ApiFeature.query;
    const productsCount = await Product.estimatedDocumentCount();
    
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    })
});

exports.getRelatedProducts = catchAsyncErrors(async (req, res, next) => {
    try {
        const resultPerPage = 8;

        const RelatedProduct = await Product.find({ category: req.body.category })
            .sort({ ratings: 1 })
            .limit(resultPerPage);

        const products = RelatedProduct.filter((item) => item._id.toString() !== req.body.productID);

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        res.status(201).json({
            success: false,
            message: "Related Product is not found"
        })
    }

})


//Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    products.options = {
        color: ['red', 'blue']
    }

    res.status(200).json({
        success: true,
        products
    })
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not found", 404));
    }

    const RelatedProduct = await Product.find({ category: product.category })
            .sort({ ratings: 1 })
            .limit(6);
    const products = RelatedProduct.filter((item) => item._id.toString() !== req.params.id);

    // product.options = {
    //     color: ['red', 'blue'],
    //     ram: ['3 GB', '4 GB']
    // }

    res.status(200).json({
        success: true,
        product,
        products
    })
});

//Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not found", 404));
    }

    //Cloudinary image upload and delete process
    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    // Parse options object
    req.body.options = JSON.parse(req.body.options)

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        UseFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});

//Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);


    if (!product) {
        return next(new ErrorHandler("Product Not found", 404));
    }

    await Product.findByIdAndRemove(req.params.id);

    let images = product.images;
    for (let i = 0; i < images.length; i++) {
        await cloudinary.v2.uploader.destroy(images[i].public_id);
    }


    res.status(200).json({
        success: true,
        message: "Product Deleted successfully"
    })
});


//Create new Review or Update the Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => (rev.user.toString() === req.user._id.toString())
    );

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev => { avg += rev.rating });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});


//Get all reviews of the product
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

//Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(rev => { rev.user.toString() !== req.query.id.toString() });

    let avg = 0;
    reviews.forEach(rev => { avg += rev.rating });
    let ratings = 0;
    if (reviews.length !== 0) {
        ratings = avg / reviews.length;  //prblem in rating and ratings
    }
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        UseFindAndModify: false
    })

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
})