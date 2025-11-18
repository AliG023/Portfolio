import User from "../models/user.model.js";
import generateToken from "../utils/jwt.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .json({ error: "Username and password don't match." });
    }

    const token = generateToken(user);

    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

const signout = async (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout success!" });
};

const requireSignin = (req, res, next) => {
  // Check cookie first, then Authorization header
  const token = req.cookies.t || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized access" });

  try {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Unauthorized access" });
      req.auth = decoded;
      return next();
    });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

const requiresAdmin = async (req, res, next) => {
  if (!req.auth) return res.status(401).json({ error: "Unauthorized access" });

  try {
    const user = await User.findById(req.auth._id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

export default {
  signin,
  signout,
  requireSignin,
  requiresAdmin,
};
