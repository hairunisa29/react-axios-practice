import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";
// import FormInput from './FormInput';
// import ModalForm from './Modal';
import './style/cardStyle.css';


const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function RecipeCard({card, refresh, setRefresh}){
    const classes = useStyles();

    // useEffect(()=>{
    //     // console.log('Data change')
    //     console.log(card)
    //   },[])

    console.log(card)

    const [formData, setFormData] = useState({
        tittle:'',
        content: '',
        image: ''
      });
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const openHandler = e => {
        e.preventDefault();
        setFormData({
            tittle:card.tittle,
            content: card.content,
            image: card.image
        })
        setModalIsOpen(true)
    }
    
    
    const closeHandler = e => {
        e.preventDefault();
        setModalIsOpen(false)
    }

    const deleteHandler = async(e) => {
        e.preventDefault();
        const response = await axios.delete(
          `http://localhost:1234/recipes/${card.id}`
        );
        console.log("status delete:"+response.status)
        alert('Berhasil dihapus')
        if(response.status===200){
            setRefresh(!refresh);
        }
    }


    const putHandler = async(e) => {
        e.preventDefault();
        const data = { tittle:formData.tittle, content:formData.content , image:formData.image };
        const response = await axios.put(
            `http://localhost:1234/recipes/${card.id}`, data
        );
        console.log("status edit:"+response.status)
        alert('Berhasil diedit')
        if(response.status===200){
            setRefresh(!refresh)
        }

    }

    const handleChange = e => {
        let data = {...formData};
        data[e.target.name] = e.target.value;
        setFormData(data)
      };

    
    const modalStyle = {
        overlay: {
            position: 'fixed',
            zIndex: 1020,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            background: 'white',
            // width: '45rem',
            overflowY: 'auto',
            position: 'relative',
            border: '1px solid #ccc',
            borderRadius: '33px',
            width: '310px',
            padding: '2rem',
            margin: '5px'
          }
      }
    

    return (
        <>
            <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={card.image}
                        title={card.tittle}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {card.tittle}
                        </Typography>
                        <Typography>
                            {card.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small" onClick={openHandler}>Edit</Button>
                        <Button size="small" onClick={deleteHandler}>Delete</Button>
                    </CardActions>
                </Card>
            </Grid>
            

            <Modal
              isOpen={modalIsOpen}
              style={modalStyle}
              ariaHideApp={false}
              // onRequestClose={props.setModal}
            >
                <button 
                    className="btn-close" 
                    onClick={closeHandler}
                    type='button'
                >
                </button>
                <div className="card-body">
                <h3 className="card-title" id='form-title'>Recipe</h3>
                
                    <div className="form-group">
                        <label htmlFor="tittle">Title</label>
                        <input type="text" className="form-control" name='tittle' id="tittle" placeholder="Enter Dish Name" value={formData.tittle} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Description</label>
                        <input type="text" className="form-control" name='content' id="content" placeholder="Enter Description" value={formData.content} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input type="text" className="form-control" name='image' id="image" placeholder="Enter Image URL" value={formData.image} onChange={handleChange}/>
                    </div>

                    <button
                      className='btn'
                      style={{ background: "#1b1a7a", border: "none", width: '100px', color: "#ffff", marginTop:"10px", marginLeft:"60px"}}
                      // type='button'
                      onClick={putHandler}
                    >
                    Submit
                    </button>
                
              </div>
                
            </Modal>


            
        </>
    );
};
export default RecipeCard;
