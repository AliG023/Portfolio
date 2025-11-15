import User from '../models/user.model.js'
import generateToken from '../utils/jwt.js'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "username": req.body.username });
        if (!user)
            return res.status(401).json({ error: "User not found" });
        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({ error: "Username and password don't match." });
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

const requireSignin = (req, res, next) => {
    const token = req.cookies.t;
    if (!token) return res.status(401).json({ error: 'Unauthorized access' });
    try {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json({ error: 'Unauthorized access' });
            req.auth = decoded;
            return next();
        });
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized access'
        })
    }
}

const hasAuthorization = (req, res, next) => {
    if (!req.auth) return res.status(401).json({ error: 'Unauthorized access' });
    const authorized = req.params && (req.params.id || req.params._id || req.params.userId);
    if (!authorized) return res.status(400).json({ error: 'Missing user id parameter' });
    next();
};

export default { signin, signout, requireSignin, hasAuthorization };