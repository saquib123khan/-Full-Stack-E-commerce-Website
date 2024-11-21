import userModel from "../models/user.model.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import AppError from "../utils/error.utils.js"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// API for user login
const loginUser = async (req, res, next) => {
    try {

        const {email,password} = req.body

        const user = await userModel.findOne({email})
        if(!user){
            return next(new AppError("User doesn't exists", 404))
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = createToken(user._id)
            res.status(200).json({
                success:true,
                message:'User login successfully',
                token
            })
        }else{
            return next(new AppError("password doesn't match", 401))
        }
        
    } catch (error) {
        return next(new AppError(error.message, 500));
    }

}

// API for user register
const registerUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return next(new AppError('All fields are required', 400));
        }

        const exists = await userModel.findOne({email})
        if(exists){
            return next(new AppError('User already exists', 409))
        }

        // validate email format
        if(!validator.isEmail(email)){
            return next(new AppError('Enter a valid email', 400));
        }
        
        // validating strong password
        if(password.length < 8){
            return next(new AppError('Enter a strong password', 400));
        }

         // Hash the doctor password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password,salt);

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET)

        res.status(200).json({
            success:true,
            message: 'User registered successfully', 
            token
        })

    } catch (error) {
         return next(new AppError(error.message, 500));
    }
}

// API for admin login
const adminLogin = async (req, res, next) => {
    try {

        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
            
        }else{
            res.json({success:false,message:'Invalid credentials'})
        }
       
        
    } catch (error) {
        return next(new AppError(error.message, 500));
    }

}

export {
    loginUser,
    registerUser,
    adminLogin
}