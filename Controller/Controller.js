import User from "../database/mongo.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const exituser = await User.findOne({ email });
        if (exituser) {
            return res.status(400).json({ message: "user already resister madarchod " })
        }
        const hasgpassword = await bcrypt.hash(password, 10);
        const member = new User({
            username,
            email,
            password: hasgpassword
        })
        await member.save();
        return res.send(200).json({ message: "user register successfully loude " })
    } catch (error) {
        return res.status(500).json({ message: "try block check madarchod " })
    }
}

const SECRETE_KEY = "RUDHRA"
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const newuser = await User.findOne({ email })
        if (!newuser) {
            return res.status(400).json({ message: "user not found mother fucker ", });
        }
        const cpassword = await User.findOne({ password })
        const rpassword = await bcrypt.compare(password, cpassword)
        if (rpassword) {
            return res.status(400).json({ message: "password incorrect madarchod " })
        }



        const username = await User.findOne({ username })
        const token = jwt.sign({ email }, SECRETE_KEY, { expiresIn: "1hr" })
        res.status(200).json({
            message: "login success wellcome madarchod  ",    // assuming your User model has a username field
            token: token, username: username
        })
    } catch (error) {
        res.status(500).json({ message: "look at try block madarchod" })
    }
}