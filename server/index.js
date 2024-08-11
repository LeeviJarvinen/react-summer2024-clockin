import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig.js';
import errorMiddleware from './middleware/errorMiddleware.js';
const { notFound, errorHandler } = errorMiddleware;
import userRoute from './routes/userRoute.js';
import clockRoute from './routes/clockRoute.js'

dotenv.config({path: './config.env'})

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: [process.env.FRONT_URL],
    credentials: true
  }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectDB();

app.use(cookieParser())

app.use('/', userRoute);
app.use('/clock', clockRoute);

app.use(notFound);
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});


export default app;
