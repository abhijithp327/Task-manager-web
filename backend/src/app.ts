import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import connectDb from './config/dbConfig';


import userRoutes from './routes/userRoute';


dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
    // origin: 'http://localhost:5173',
    // origin: 'http://192.168.10.194:5173',
    credentials: true
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes)



app.get('/', (req: Request, res: Response) => {
    res.json('Task management server is running... ✅🚀');
});



connectDb().then(() => {
    app.listen(port, () => {
        console.log('✅ Database connected successfully 🚀');
        console.log(`🔴 Server is running http://localhost:${port}`);
    });
});

