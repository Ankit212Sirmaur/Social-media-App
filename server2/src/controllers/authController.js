const User = require('../models/UserSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success } = require('../utils/responseWrapper');
const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'All field are required'
            });
        }
        const olduser = await User.findOne({ email });
        if (olduser) {
            return res.status(409).json({
                message: 'This email is already'
            })
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            email,
            password: hashPassword,
        })
        return res.status(201).json({
            user,
        })
    } catch (error) {
        console.log(error);
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'All field are required'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'This email is not registred'
            })
        }
        const matchpass = bcrypt.compareSync(password, user.password);
        if (!matchpass) {
            return res.status(403).json({
                message: 'password incorrect'
            })
        }
        const token = generateToken({
            user: user._id
        });
        const refreshtoken = refreshAccessToken({
            user: user._id,
        })
        return res.send(success({token}));
    } catch (error) {
        console.log(error);
    }
}
//refreshAccessToken will check refreshtoken validity and generate a new token
const refreshAccessTokenController = async (req, res) => {
    const { refreshtoken } = req.body;
    if (!refreshtoken) {
        console.log('refresh_Token required');
    }
    try {
        const decode = jwt.verify(refreshtoken, process.env.Refresh_token_key);
        const id = decode.user;
        const newtoken = generateToken({ id });
        return res.status(201).json({
            newtoken,
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json('invalid token');
    }
}

const refreshAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.Refresh_token_key, {
            expiresIn: '1hr'
        });
        return token
    } catch (error) {
        console.log(error);
    }
}
const generateToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.Access_token_key, {
            expiresIn: '15m'
        });
        return token
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    signupController, loginController, refreshAccessTokenController,
}