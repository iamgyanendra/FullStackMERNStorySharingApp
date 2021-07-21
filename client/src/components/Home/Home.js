import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

import Posts from '../Posts/Posts'
import Form from '../Forms/Forms'

import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../action/posts'
//import {getPosts, getPostsBySearch} from '../../action/posts'

import Pagination from '../Pagination'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}
const Home = () => {

    const [currentId, setCurrentId] = useState(null) //id is null at the start when id is not slected // sending to the comp

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch]=useState("");
    const [tags, setTags]= useState([])
    
    const query = useQuery();
    
    const page = query.get('page') || 1 // this will read url and check if the]re is page parameter or not // if not at page then must be on first page
    const searchQuery = query.get('searchQuery');



    
    const handleAdd = (tag)=> setTags([...tags, tag])//spread old tag and add new tag init
    const handleDelete = (tagToDelete)=> setTags(tags.filter((tag)=> tag !== tagToDelete));
    const searchPost= ()=>{
        if(search.trim() || tags){
            //dispatch => fetch search post
            dispatch(getPostsBySearch( {search, tags: tags.join(",")} )); //tags are like [USA, EROP] => 'usa,EROP' (string)
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/')//redirect back if nothing
        }
    }
    const handleKeyPress = (e)=>{
        if(e.keyCode===13){  //13 ===enter
            //search post
            searchPost();
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3} className= {classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name= "search" variant="outlined" label="Search Stories" fullWidth onKeyPress={handleKeyPress} value={search} onChange={(e)=>setSearch(e.target.value)} />
                            <ChipInput 
                                style={{margin: '10px 0'}}
                                value={tags} 
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                                />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) &&(
                            
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
export default Home;

