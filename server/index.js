import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

//const express = require('express')

const app = express();
//dotenv.config();


app.use(express.json({limit: '10mb', extended: true }));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(cors());

app.use('/posts', postRoutes); //every routs from posts
app.use('/user', userRoutes);

app.get('/', (req, res)=>{
    res.send('Hello story app API')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false); // for no warning in console