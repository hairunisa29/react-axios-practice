import * as React from 'react';
import {useEffect, useState} from 'react';
import RecipeCard from './RecipeCard'
import useStyles from './Style'
import {Button, Container, CssBaseline, Grid, Typography} from "@mui/material";
import axios from "axios";
import Modal from 'react-modal';
import './style/cardStyle.css';


function Recipes() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const [formData, setFormData] = useState({
    tittle:"",
    content: "",
    image: ""
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  //deps = [] -- dijalankan hanya sekali
  useEffect(()=>{
    console.log('useEffect')
    axios.get('http://localhost:1234/recipes').then(res => {
      setCards(res.data)
    })
  },[refresh])


  const handleChange = e => {
    let data = {...formData};
    data[e.target.name] = e.target.value;
    setFormData(data)
  };

  const postHandler = async(e) => {
    e.preventDefault();
    alert('ok')
    const data = { tittle:formData.tittle, content:formData.content , image:formData.image };
 
    const response = await axios.post("http://localhost:1234/recipes", data);
    console.log("status post:"+response.status)
    alert("Berhasil menyimpan data")

    if (response.status===201){
      setFormData({
        tittle:"",
        content: "",
        image: ""
      });
      setRefresh(!refresh);
    }
  }



  const doRefresh = () => {
    console.log('doRefresh')
    setRefresh(!refresh)
  }

  const openHandler = e => {
    e.preventDefault();
    setModalIsOpen(true)
  }


  const closeHandler = e => {
    e.preventDefault();
    setModalIsOpen(false)
  }



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
        width: '45rem',
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
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Button onClick={doRefresh}>Refresh</Button>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Recipes
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Aneka macam ide resep masakan dan makanan yang simpel
              tersaji disini untuk memberi panduan dan mempermudah dalam menentukan hidangan lezat untuk
              keluarga anda
            </Typography>
            {/* <div className={classes.heroButtons}>
            </div> */}
            <button 
              className="custom-button"
              onClick={openHandler}
            >
              +
            </button>
              
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
                      onClick={postHandler}
                    >
                    Submit
                    </button>
                
              </div>
                
            </Modal>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (

              <RecipeCard 
                key={card.id} 
                card={card} 
                openModal={openHandler}
                modalIsOpen={modalIsOpen}
                closeModal={closeHandler}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            ))}
          </Grid>
        </Container>


        

        {/* <ModalForm
          modalIsOpen={modalIsOpen}
          closeModal={closeHandler}
          postHandler={postHandler}
          handleChange={handleChange}
          tittle={tittle}
          content={content}
          image={image}
        /> */}
        
      </main>
    </React.Fragment>
  );
}

export default Recipes;