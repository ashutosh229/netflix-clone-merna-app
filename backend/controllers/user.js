import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "Invalid data",
      });
    }

    const user = await User.findOne({
      email: email,
    });

    if (user) {
      return res.status(401).json({
        success: false,
        message: "This email is already registered",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    // const userCreated = await User.create({
    //   username: username,
    //   email: email,
    //   password: hashedPassword,
    // });
    const userCreated = {
      username: username,
      email: email,
      password: hashedPassword,
    };
    const userCreatedjson = JSON.stringify(userCreated);

    const newUser = new User(userCreatedjson);
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User has been registered",
    });
  } catch (error) {
    console.log("An error has occured", error);
    return res.status(500).json({
      success: false,
      message: "An error has occured",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Invalid data",
      });
    }

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email is not registered",
      });

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }
      const tokenData = {
        id: user._id,
      };
      const token = await jwt.sign(tokenData, "secretkey", { expiresIn: "1d" });
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json({
          success: true,
          message: `Welcome ${user.username}`,
          user: user,
        });
    }
  } catch (error) {
    console.log(
      "An error has been occured during login. Please try again",
      error
    );
    return res.status(500).json({
      success: false,
      message: "An error has been occured during login. Please try again",
    });
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true })
    .json({
      success: true,
      message: "User has successfully logged out",
    });
};
