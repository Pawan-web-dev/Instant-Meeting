import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { Metting } from "../models/metting.model.js"

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "please provide" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "user not found" });
    }
    const isPasswordValid=await bcrypt.compare(password, user.password)
   
   
    if ( isPasswordValid) {
      let token = crypto.randomBytes(20).toString("hex"); //token length 40,
      user.token = token;
      await user.save();
       return res.status(httpStatus.OK).json({ token: token });
    }
    else{
    return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid Username or Password"})
    }

  } catch (e) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `something went wrong ${e}` });
  }
};

export const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User Already Exists" });
    }
    // hashing password:
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(httpStatus.CREATED)
      .json({ message: "user Created Successfully" });
  } catch (e) {
    res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: `something went wrong ${e}` });
  }
};


export const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
      const user = await User.findOne({ token: token });
      const meetings = await Metting.find({ user_id: user.username })
      res.json(meetings)
  } catch (e) {
      res.json({ message: `Something went wrong ${e}` })
  }
}

export const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
      const user = await User.findOne({ token: token });

      const newMeeting = new Metting({
          user_id: user.username,
          meeting_code: meeting_code     //mettingCode
      })

      await newMeeting.save();

      res.status(httpStatus.CREATED).json({ message: "Added code to history" })
  } catch (e) {
      res.json({ message: `Something went wrong ${e}` })
  }
}