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
  res.send('API is running');
});

app.listen(PORT ,()=>{
  console.log(`server is running on port ${PORT}`)
})