import React, { useContext, useEffect, useState } from 'react'
import { Context } from './Parent'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { Tooltip } from '@mui/material';
let doc=document.body.getElementsByTagName('div')
doc.info.style.display='none'
let can=document.body.getElementsByTagName('canvas')
can.c.style.display='none'
const Products = () => {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '65vw',
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        
      };
      const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20%',
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center'
      };
    const [sele,setSele]=useState([])
      const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = (e) => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

    const Cont=useContext(Context)
   useEffect(()=>{
    let a=fetch('https://fakestoreapi.com/products')
    a.then(res=>res.json())
    .then(json=>Cont.products[1](json))
   },[])

   const handleCart=(sel)=>{
    sel['quan']=1
       const exists=Cont.cart[0].filter(items=> items.id==sel.id)
       if(exists.length===0){
        let newAr = [...Cont.cart[0],sel]
        Cont.cart[1](newAr)
       }else{
         let newAr=Cont.cart[0].map((items) => {
          if(items.id===sele.id){
              items.quan+=1
              return items
          }
          return items
      })
      Cont.cart[1](newAr)
       }
       setOpen(false)
    }
   
  return (
    <div className='prod'>
          {Cont.products[0].map((items,key)=> <Card key={key} sx={{ maxWidth:'30%' ,marginY:'3%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly',minHeight:'50vh',
          backgroundColor:'#bbdefb'
          
        }} component='div'  >
          <Tooltip arrow title={<h2>Double Click To Preview</h2>}>
      <CardMedia
        component="img"
        sx={{width:'30%'}}
        src={items.image}
        id={items.id} onDoubleClick={(e)=>{handleOpen1(); let sele1=Cont.products[0].filter(items=> e.target.id==items.id);setSele(sele1[0])}}
        
      />
      </Tooltip>
      <CardContent component='inp' >
        <Typography gutterBottom variant="h5" sx={{wordWrap:'wrap',width:'22vw'}} component='inp'>
          {items.title}
        </Typography>
      </CardContent>
      <CardActions component='in'>
        <Tooltip arrow title={<h2>Click To Know Details</h2>}>
        <Button size="small"  variant='contained' color='warning' id={items.id} onClick={(e)=>{handleOpen(); let sele1=Cont.products[0].filter(items=> e.target.id==items.id);setSele(sele1[0])}}>Learn More</Button>
        </Tooltip>
      </CardActions>
    </Card>)}

    {console.log(sele)}
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        <CardMedia
        component="img"
        sx={{width:'10vw'}}
        src={sele.image}
        
      />
          <Typography id="modal-modal-title" variant="h5" component="h2">
            <b>NAME:</b> {sele.title}
          </Typography>
          <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }}>
            <b>INFO:</b> {sele.description}
          </Typography>
          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            <b>Price: $</b> {sele.price}
          </Typography>
          <CardActions>
            <Button variant='contained' color='success' size='large' id={sele.id} onClick={()=>{handleCart(sele)}}>&#43;</Button>
          </CardActions>
        </Box>
      </Modal>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        
        <Box sx={style1} >
        <CardMedia
        component="img"
        sx={{width:'10vw'}}
        src={sele.image}
        
      />
        </Box>
      </Modal>
    </div>
  )
}

export default Products