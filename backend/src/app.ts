import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import connectDb from './config/dbConfig';
import bodyParser from "body-parser";
import morgan from "morgan";

import userRoutes from './routes/userRoute';
import adminRoutes from './routes/adminRoute';
import taskRoutes from './routes/taskRoute';


import errorHandler from './helper/errorHandler';


dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/task", taskRoutes);

// error handler middleware
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
    res.json('Task management server is running... ✅🚀');
});



connectDb().then(() => {
    app.listen(port, () => {
        console.log('✅ Database connected successfully 🚀');
        console.log(`🔴 Server is running http://localhost:${port}`);
    });
});

