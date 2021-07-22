import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import cookieSession from 'cookie-session';



//const express = require('express')

const app = express();
dotenv.config();


app.use(express.json({limit: '30mb', extended: true }));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.set('trust proxy', 1)
app.use(cookieSession({
      name: "__session",
      keys: ["key1"],
        maxAge: 24 * 60 * 60 * 100,
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    })
);
// app.post('/user', (req, res)=>{
//     const cookie = "user=gyan; samesite=none; secure"

//     res.setHeader("set-cookie", [cookie])
//     res.send("ok")
// })

app.use('/posts', postRoutes); //every routs from posts
app.use('/user', userRoutes);

app.get('/', (req, res)=>{
    res.send('Hello story app API')
})
const PORT = process.env.PORT || 5000  //port num

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false); // for no warning in console