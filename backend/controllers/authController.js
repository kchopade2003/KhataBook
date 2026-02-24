const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register

exports.register = async(req, res) => {
    try{
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPass
        });

        res.status(200).json({message: "User Registered Successfully."});
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    }
};

exports.login = async(req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            res.status(400).json({message: "Invalid Credetials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({message: "Invalid Credetials"});
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({token});
    } catch(err) {
        res.status(500).json({message: "Server error"});
    }
}