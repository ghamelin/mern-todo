import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';


const port = process.env.PORT || 4000;
import userRoutes from './routes/userRoutes.js';

connectDB();
const app = express();

app.get('/', (req, res) => { res.send('Server is ready'); });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });
