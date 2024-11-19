import jwt from 'jsonwebtoken'
import AppError from '../utils/error.utils.js'

const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers

        if(!token){
            return res.status(401).json({
                success:false,
                message:'Not authorized login again'
            })
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({
                success:false,
                message:'Not authorized login again'
            })
        } 

        next()

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

export default adminAuth