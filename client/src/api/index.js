import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPost = ()=>axios.get(url); // return all the post from database
export const createPost = (newPost)=>axios.post(url, newPost)
