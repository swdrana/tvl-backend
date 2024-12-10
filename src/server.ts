import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
