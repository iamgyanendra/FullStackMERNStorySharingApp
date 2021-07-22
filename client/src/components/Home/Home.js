import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Chip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../action/posts';
import Posts from '../Posts/Posts';
import Form from '../Forms/Forms';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {

    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1 // this will read url and check if the]re is page parameter or not // if not at page then must be on first page
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(0) //id is null at the start when id is not slected // sending to the comp
    const dispatch = useDispatch();

    const [search, setSearch]=useState('');
    const [tags, setTags]= useState([])
    const history = useHistory();
    
    
    
    const searchPost= ()=>{
        if(search.trim() || tags){
            //dispatch => fetch search post
            dispatch(getPostsBySearch( {search, tags: tags.join(',')} )); //tags are like [USA, EROP] => 'usa,EROP' (string)
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
    const handleAddChip = (tag)=> setTags([...tags, tag])//spread old tag and add new tag init
    
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name= "search" variant="outlined" label="Search Stories" fullWidth onKeyPress={handleKeyPress} value={search} onChange={(e)=>setSearch(e.target.value)} />
                            <ChipInput 
                                style={{margin: '10px 0'}}
                                value={tags} 
                                onAdd={(chip)=> handleAddChip(chip)}
                                onDelete={(chip)=> handleDeleteChip(chip)}
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

