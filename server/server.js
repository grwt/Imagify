import express from 'express';
import cors from 'cors';
import 'dotenv/config'  
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());  
await connectDB();

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/',(req,res)=>{
  try {
    res.send('API is running');
  } catch (error) {
    console.error("Error in / route:", error);
    res.status(500).json({ error: error.message });
  }
});

export default function handler(req, res) {
  return app(req, res);
}