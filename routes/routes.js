const express = require('express');
const mongoose = require('mongoose');

var fullUrl = 'DATABSE URL HERE';

mongoose.connect(fullUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new User({
    _id: Number,
    role: String, //admin or user
    username: String,
    fullname: String,
    password: String,
    q1: Number,
    q2: Number,
    q3: Number,
    q4: Number,
    

});