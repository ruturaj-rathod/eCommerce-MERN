const app = require("./app");
const express = require("express");
const path = require("path");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting Down the server due to Uncaught Exception`);
    process.exit(1);
})


//config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: "./config/config.env" });
}

//Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINAY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// static files (build of your frontend)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend', 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
    })
}

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:` + process.env.PORT);
});



// Unhandled promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting Down the server due to unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
})
