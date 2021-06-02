import express from 'express';
import mongoose from 'mongoose';

//all the function related to posts routes will be here
import PostMessage from '../models/postMessage.js'; //my database schema/model

const router = express.Router();
export const getPost = async (req, res) => {
    try {
        const postMessage = await PostMessage.find() //retrieve all post from database

        res.status(200).json(postMessage) //return 
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// export const createPost = async (req, res) => {

//     const post = req.body;
//     const newPost = new PostMessage(post);

//     try {
//        await newPost.save();

//        res.status(201).json(newPost);
//     } catch (error) {
//         res.status(409).json({message: error.message});
//     }
// };

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) =>{
    const {id: _id} = req.params; //through url
    const post=req.body;

    if(!mongoose.Types.isValid(_id)) return res.status(404).send("No Post"); // id is valid or not

    const updatedPost= await PostMessage.findByIdAndUpdate(_id, post, {new: true}); // update if valid

    res.json(updatedPost);
}