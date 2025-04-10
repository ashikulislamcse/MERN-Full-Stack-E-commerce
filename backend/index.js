import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const app  = express();
app.use(cors(
    credentials = true,
    origin = process.env.FRONTEND_URL
));
app.use(express.json());





