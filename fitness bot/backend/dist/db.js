"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017");
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 60,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
});
const user = mongoose.model("User", userschema);
module.exports = user;
