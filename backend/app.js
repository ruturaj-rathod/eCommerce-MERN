const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();

const errorMiddleware = require("./middleware/error");
//config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: "./config/config.env" });
}
// dotenv.config({path:"./config/config.env"});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());

//Route Imports 
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for Errors
app.use(errorMiddleware);


module.exports = app;