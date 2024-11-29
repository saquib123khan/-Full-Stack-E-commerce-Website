import mongoose from "mongoose";

const connectionToDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    })

    await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`)

}

export default connectionToDB