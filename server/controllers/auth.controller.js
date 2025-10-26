import User from '../models/user.model.js'
import generateToken from '../utils/jwt.js'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'
// import { expressjwt as expressJwt } from 'express-jwt'


const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email });
        if (!user)
            return res.status(401).json({ error: "User not found" });
        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({ error: "Email and password don't match." });
        }

    const token = generateToken(user);

    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.json ({ token, user });
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" });
    }
}

const signout = async (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout success!" });
}

// const requireSignin = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'auth' });
const requireSignin = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.t;
    if (!token) return res.status(401).json({ error: 'Unauthorized access' });
    try {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json({ error: 'Unauthorized access' });
            req.auth = decoded;
            next();
        });
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized access'
        })
    }
}

const hasAuthorization = (req, res) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!authorized) {
        return res.status(403).json({ error: "User is not authorized" });
    }
    next();
}

export default { signin, signout, requireSignin, hasAuthorization };