const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userController = {
    // register
    register: asyncHandler(async(req,res)=> {
        const {name, password, email, } = req.body
        if(!name || !email || !password) {
            res.status(400)
            throw new Error("All fields  are required")
        }

        const userExist = await User.findOne({email});
        if(userExist){
            res.status(400);
            throw new Error("User already Exist");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name, 
            password: hashedPassword,
            email
        });

        res.status(201).json({
            message: "user created Succesfully",
            user: {
                name: user.name,
                email: user.email
            }
        })
    }),
    // login
    login: asyncHandler(async(req,res)=> {
        const {email, password} = req.body
        if(!email || !password){
            res.status(400)
            throw new Error("All fields are required to log user in")
        }
        const user = await User.findOne({email});
        if(!user){
            res.status(400);
            throw new Error("Invalid Login Crederntials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400);
            throw new Error("Invalid Login credentials");
        }
        const token =  jwt.sign({id: user._id}, process.env.JWT_KEY, {expiresIn: "30d"})

        res.status(200).json({
            message: "User Logged in successfully",
            token,
            user: {
                email: user.email,
                name: user.name,
            }
        })
    })
}

module.exports = userController