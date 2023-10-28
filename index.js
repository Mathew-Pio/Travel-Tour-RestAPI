import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import tourRoutes from './routes/tour.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import reviewRoutes from './routes/review.js';
import bookingRoutes from './routes/booking.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
    origin: true,
    credentials: true
}

// database connection
mongoose.set('strictQuery', false);
const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })

        console.log('MongoDb database connected')
    }catch(err){
        console.log('MongoDb database connection failed')
    }
}

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.listen(port, () => {
    connectDb()
    console.log('app is listening on port', port)
})  