import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const signup = async (req, res) => {
  const { UserName, Email, Password } = req.body;
  if (!UserName || !Email || !Password) {
    return res.json({
      success: false,
      message: "Please provide all the fields",
    });
  }
  try {
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User with this email already exists",
      });
    }
    if (Password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be atleast 8 characters",
      });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    const NewUser = new User({
      UserName,
      Email,
      Password: hashedPassword,
    });
    await NewUser.save();

    const token = jwt.sign({ id: NewUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, message: "Succesfully signed in" });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};
export const Login = async (req, res) => {
  const { Email, Password } = req.body;
  if ((!Email, !Password)) {
    return res.json({
      success: false,
      message: "Please provide all the fields",
    });
  }
  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.json({ success: false, message: "User doesnot exist" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: "Succesfully loggedin" });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};
export const Logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.json({ success: true, message: "Succesfully logged Out" });
  } catch (err) {
    return res.json({ succes: false, message: err });
  }
};

export const me = async (req, res) => {
  try {
    const token = res.cooke.token;
    if (!token) {
      return res.json({ success: false, message: "no token found" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne(verifyToken.id).select("UserName email");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, message: "succesfully logged in" });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};
