import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const app = express();

app.use(cors({
  origin: 'https://imagify-client-azure.vercel.app', // OR use '*' for all origins (not recommended for production)
  credentials: true // if you're using cookies or Authorization headers
}))
app.use(express.json());

// Connect to DB
await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Export app wrapped in Vercel-compatible handler
export default app;
