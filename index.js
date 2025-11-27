import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import authoraizeUser from './lib/jwtMiddlewear.js';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_DB_URI // mongoDb eken link eka aran ekat password eka dagatha
mongoose.connect(mongoURI).then(
    () => {
        console.log("Connected to MongoDB");
    }
).catch(
    () => {
        console.log("Error connecting to MongoDB");
    }
);


const app = express();// complete backend software ekak app kiyana eka athulata dagatha
app.use(express.json()); // meken wenne middlewear create wenawa apahadili data pahadili karala denawa json format eken
app.use (authoraizeUser)




app.use("/users", userRouter);








app.listen(3000,
    () => {
        console.log("server is running on port 3000")
    }
)