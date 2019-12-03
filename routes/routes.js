const express = require('express');
const mongoose = require('mongoose');

var fullUrl = 'mongodb+srv://DanAndLuis:DanAndLuis@interactivewebdevfinal-8z02v.mongodb.net/InteractiveWebDevFinal?retryWrites=true&w=majority';

mongoose.connect(fullUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
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


const router = express.Router();

const user = mongoose.model("users", UserSchema);

router.route("/").get(
    function(req,res){
        res.render("index");
    }
);

router.route("/registration").get(
    function(req,res){
        res.render("registration");
    }
);

router.route().get(
    function(req,res){
        
    }
)

module.exports = router;