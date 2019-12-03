const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var fullUrl = 'mongodb+srv://DanAndLuis:DanAndLuis@interactivewebdevfinal-8z02v.mongodb.net/InteractiveWebDevFinal?retryWrites=true&w=majority';

mongoose.connect(fullUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Connected To Database"))
    .catch(err => {console.log(Error, err.message)});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    _id: Number,
    role: String, //admin or user
    username: String,
    fullname: String,
    password: String,
    email: String,
    age: Number,
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

router.route("/register").get(
    function(req,res){
        var model = {
            role: req.session.role
        }
        res.render("register", model);
    }
)

router.route("/registration").post(
    async function(req,res){
        //create user
        var model = {
            role: req.session.role
        }
        var item = {
            username: req.body.username,
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            q1: req.body.q1,
            q2: req.body.q2,
            q3: req.body.q3,
            q4: req.body.q4
        }
        console.log(item);
        bcrypt.hash(item.password, 10, async function(err, hash) {
            console.log("--hash--")
            console.log(hash)
            console.log("-------")
            console.log(item.password)
            if(item){
                console.log("Making a User, i hope");
                var newItemInsert = new user({
                    _id: mongoose.Types.ObjectId(),
                    fullname: item.fullname,
                    username: item.username,
                    password: hash,
                    email: item.email,
                    role: "user"
                })
                await newItemInsert.save(function (err) {
                    if (err) return handleError(err);
                    console.log("saved user");
                });
            };
        },
        res.redirect("/login",model));
    }
);

router.route("/").get(
    function(req,res){

    }
)

module.exports = router;