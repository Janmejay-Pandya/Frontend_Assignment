import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req,res)=>{
  const {name,email,password} = req.body;
  const hashed = await bcrypt.hash(password,10);
  await User.create({name,email,password:hashed});
  res.json({message:"User Registered"});
};

export const login = async (req,res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email" });
    }
    const ok = await bcrypt.compare(password,user.password);
    if(!ok) return res.status(400).json({message:"Wrong password"});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.json({token});
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};