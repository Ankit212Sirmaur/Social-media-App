const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { success, error } = require("../utils/responseWrapper");
const signupController = async (req, res) => {
    try {
        const {name,  email, password } = req.body;
        if (!name || !email || !password) {
            return res.send(error("All field are required", 400));
        }
        const olduser = await User.findOne({ email });
        if (olduser) {
            return res.send(error("This email is already registered", 409));
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        return res.send(success("user successfully signup", 200));
    } catch (e) {
        console.log(e);
        return res.send(error("something error while signup", 500));
    }
};
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send(error("All field are required", 400));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.send(error("This email is not registred", 404));
        }
        const matchpass = bcrypt.compareSync(password, user.password);
        if (!matchpass) {
            return res.send(error("password incorrect", 403));
        }
        const Accesstoken = generateToken({
            _id: user._id,
        });
        const refreshtoken = refreshAccessToken({
            _id: user._id,
        });
        res.cookie("jwt", refreshtoken, {
            httpOnly: true,
            secure: true,
        });
        return res.send(success({ Accesstoken }, 201));
    } catch (e) {
        console.log(e);
        return res.send(error("something error while login", 500));
    }
};
//refreshAccessToken will check refreshtoken validity and generate a new token
const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) {
        return res.send(error("Refresh token is required"));
    }
    const refreshtoken = cookies.jwt;
    try {
        const decode = jwt.verify(refreshtoken, process.env.Refresh_token_key);
        const _id = decode._id;
        console.log(_id);
        const newAccesstoken = generateToken({ _id });
        return res.send(success({ newAccesstoken }, 201));
    } catch (e) {
        console.log(e);
        return res.send(error("invalid token", 401));
    }
};

const refreshAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.Refresh_token_key, {
            expiresIn: "1y",
        });
        return token;
    } catch (error) {
        console.log(error);
    }
};
const generateToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.Access_token_key, {
            expiresIn: "1d",
        });
        return token;
    } catch (error) {
        console.log(error);
    }
};

const logoutController = async (req, res) =>{
    try { // backend deleting refresh token => frontend will delete access token
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
        })
        return res.send(success('User logged out', 200));
    } catch (e) {
        return res.send(error(e.message, 500));
    }
}
module.exports = {
    signupController,
    loginController,
    refreshAccessTokenController,
    logoutController
};
