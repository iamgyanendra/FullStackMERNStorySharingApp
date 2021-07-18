import React, {useState, useEffect} from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import FileBase from 'react-file-base64';//choose file
 import useStyles from './styles';
import {createPost, updatePost } from '../../action/posts';
//import { updatePost } from '../../../../server/controllers/posts';
import {useDispatch, useSelector} from 'react-redux';
//

//get the current id from post for updating the post

const Forms = ({currentId, setCurrentId})=> {
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''})

    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile')); //get user name from localstorage

    useEffect(() => {
      if(post) setPostData(post);
    }, [post])

    const clear = ()=>{
      setCurrentId(0)
      setPostData({title: '', message: '', tags: '', selectedFile: ''})


  }
    const handleSubmit = async(e) =>{
        e.preventDefault(); //not to get refresh

        if(currentId===0){

          dispatch(createPost({...postData, name: user?.result?.name})); // name from login
          clear();
        }
        else{
          dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
          clear();
        }

    }
    if(!user?.result?.name){ // if user is not logged in
      return(<Paper>
        <Typography className={classes.paper} color="primary">
          Please Sign In to Write Your Own Stories and Like other's Stories.
        </Typography>
      </Paper>)

    }
   
    return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Edit your Story' : 'Write Your Story'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    )
}
export default Forms;