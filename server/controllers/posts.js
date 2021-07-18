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
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createAt: new Date().toISOString()})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

   if(!req.userId) return res.json({message:'Unauthenticated'}) // check login

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id)=> id === String(req.userId)) // user id is in like section or not

    if(index === -1){
        //like the post
        post.likes.push(req.userId); // pushing id of user in like section
    }else{
        // remove like from post
        post.likes = post.likes.filter((id)=> id !== String(req.userId)); //return all likes accept the current user
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}


