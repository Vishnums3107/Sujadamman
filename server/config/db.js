import mongoose from 'mongoose';

const DEFAULT_MONGODB_URI = 'mongodb://127.0.0.1:27017/furniture';

const getMongoUri = () => process.env.MONGODB_URI?.trim() || process.env.MONGO_URI?.trim() || DEFAULT_MONGODB_URI;

const connectDB = async () => {
  try {
    const mongoUri = getMongoUri();
    const usingFallbackUri = mongoUri === DEFAULT_MONGODB_URI;
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}${usingFallbackUri ? ' (local fallback)' : ''}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
