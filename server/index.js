import express from 'express';
//import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

//const express = require('express')

const app = express();
app.use(express.json({extended: true }));
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/posts', postRoutes) //every routs from posts

const CONNECTION_URL = "mongodb+srv://Gyanendra:manish123@cluster0.nklww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000  //port num

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`)))
.catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false); // for no warning in console