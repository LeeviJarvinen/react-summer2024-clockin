import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: './config.env'});

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;
