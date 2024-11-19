import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectionToDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.route.js'
import errorMiddleware from './middlewares/error.middleware.js'
import productRouter from './routes/product.route.js'

// App config
const app = express()
const PORT = process.env.PORT || 4000
connectionToDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())
app.use(errorMiddleware)

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/', (req,res)=>{
    res.send('API working')
})

app.listen(PORT,  ()=> {
   console.log(`server is running on port http:localhost:${PORT}`);
})