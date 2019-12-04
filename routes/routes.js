const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var fullUrl = 'mongodb+srv://DanAndLuis:DanAndLuis@interactivewebdevfinal-8z02v.mongodb.net/InteractiveUserDatabase?retryWrites=true&w=majority';

mongoose.connect(fullUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Connected To Database"))
    .catch(err => {console.log(Error, err.message)});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    _id: ObjectId,
    role: String, //admin or user
    username: String,
    fullname: String,
    password: String,
    email: String,
    age: Number,
    q1: String,
    q2: String,
    q3: String

},{collection:"users"});


const router = express.Router();

const user = mongoose.model("users", UserSchema);

router.route("/").get(
    function(req,res){
        res.render("index");
    }
);

router.route("/register").get(
    function(req,res){
        console.log("SENDING TO ADD USER");
        // var model = {
        //     role: req.session.role
        // }
        res.render("register");
    }
)

router.route("/register").post(
    async function(req,res){
        console.log("ADDING USER I HOPE X3")
        console.log(req.body)
        var model = {
            role: req.session.role
        }
        var item = {
            username: req.body.username,
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            q1: req.body.question1,
            q2: req.body.question2,
            q3: req.body.question3
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
                    role: "user",
                    q1: item.q1,
                    q2: item.q2,
                    q3: item.q3
                })
                await newItemInsert.save(function (err) {
                    if (err) return handleError(err);
                    console.log("saved user");
                });
            };
        },
        res.redirect("/"));
    }
);

router.route("/login").post(
    async function(req,res){
        console.log(req.body);
        var item = {
            username: req.body.username,
            password: req.body.password,
        }
        await user.findOne({username: item.username},function(err, userObj){
            if(userObj != null){
                console.log("--------")
                console.log(userObj.username)
                console.log(userObj.role)
                console.log("--------")
                var matches = bcrypt.compare(item.password, userObj.password);
                if(matches){
                    console.log("login comlpete!")
                    req.session.username = userObj.username;
                    req.session.role = userObj.role;
                    console.log(req.session.role);
                    res.redirect("/home")
                }
                else{
                    console.log("login failed")
                    res.redirect("/")
                }
            }
            else{
                console.log("Username Does Not Exist")
                model={
                    message:"User Does Not Exist"
                }
                res.render("index",model);
            }
        })
    }
)

router.route("/home").get(
    function(req,res){
        


        var model = {
            role: req.session.role
        }
        res.render("home",model);
    }
);

router.route("/admin").get(
    function(req,res){
        var model={
            role: req.session.role
        }
        if(model.role == "admin"){
            res.render("admin", model);
        }
        else {
            res.redirect("/");
        }
    }
);

module.exports = router;