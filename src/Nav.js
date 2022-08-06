import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { faCartShopping, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Context } from './Parent'
import Tooltip from '@mui/material/Tooltip'


const Nav = () => {
    const [dra,setDra]=useState(false)
    const [dra1,setDra1]=useState(false)
    const Cont=useContext(Context)
    const warn=<h3>Yout Cart Will Be Cleared</h3>
    const count=Cont.cart[0].length;
    //delete Particular Item
    const dele=(e)=>{
        
        let id=e.target.id
        let arr=[...Cont.cart[0]]
        let newAr=arr.filter(items => items.id!=id)
        Cont.cart[1](newAr)
     }
     //Bill
     let bill=0;
    Cont.cart[0].length!=0? Cont.cart[0].map((items)=> bill+=items.quan*items.price):<></>
    bill.toFixed(2)
    const quanti=(e,key)=>{
          if(key ==='-'){
            let newAr=Cont.cart[0].map((items)=> {
              if(items.id==e){
                if(items.quan>1){
                  items.quan-=1
                  return items
                }else{
                  alert('Quantity Reached 1')
                  // return items
                }
              }
              return items
            })
            Cont.cart[1](newAr)
          }
          if(key ==='+'){
            let newAr=Cont.cart[0].map((items)=> {
              if(items.id==e){
                  items.quan+=1
                  return items
              }
              return items
            })
            Cont.cart[1](newAr)
          }
    }

  return (
    <div className='nav'>
        
    <div className='disCart'>
      <Tooltip arrow title={<h2>Click to view Cart</h2>}>
            <Button onClick={()=>{setDra1(true)}}>
              <FontAwesomeIcon icon={faCartShopping} style={{color:'white',fontSize:'50px'}} /><sub className='sub'>{count}</sub>
            </Button>
    </Tooltip>
    <Tooltip title={warn}>
    <Button variant='contained' color='primary' ><Link className='links' to='/game'>&#x1F3AE;</Link></Button>
    </Tooltip>
    <Drawer
            anchor={'left'}
            open={dra}
            onClose={()=>{setDra(false)}}
          >
            <Button variant='contained' sx={{margin:'3%',padding:'4%'}}>Home</Button>
            <hr style={{width:'20vw'}} />
            <Button variant='contained' sx={{margin:'3%',padding:'4%'}}>Home</Button>
            <hr style={{width:'20vw'}} />
            <Button variant='contained' sx={{margin:'3%',padding:'4%'}}>Home</Button>
            <hr style={{width:'20vw'}} />
          </Drawer>

          <Drawer
            anchor={'right'}
            open={dra1}
            onClose={()=>{setDra1(false)}}
            PaperProps={{
                sx: {
                    width:'100vw',wordWrap:'break-word'
                }
              }}
            
          ><Button color='error' variant='contained' sx={{width:'10%',fontSize:'20px'}} onClick={()=>{setDra1(false)}}>&times;</Button>
            

           {Cont.cart[0].length!=0?<table>
            {Cont.cart[0].map((items)=> <tr><td>Name: {items.title}</td>
            <td><img src={items.image} alt='' width='40%' height='40%'/></td>
            <td>Price: ${items.price}</td>
            <td style={{width:'20%'}}>X 
                <Button variant='contained' onClick={(e)=>{quanti(e.target.id,'-')}}  color='warning' id={items.id} sx={{marginX:'2%',borderRadius:'500px'}}>&#x2212;</Button> 

               <b>{items.quan}</b>

                <Button variant='contained' color='warning' sx={{marginX:'2%',borderRadius:'500px'}} id={items.id} onClick={(e)=>{quanti(e.target.id,'+')}}>+</Button>
            </td>

            <td>Amount:$ {(items.quan*items.price).toFixed(2)}</td>
            <td ><Tooltip arrow title={<h3>Remove The product</h3>}>
            <Button id={items.id} onClick={dele} color='error' sx={{fontSize:'30px'}}>
            &times;
            </Button>
            </Tooltip>
            </td>
            </tr>)}
            <h2>Bill: {bill.toFixed(2)}</h2>
            <Tooltip arrow title={<h2>Checkout</h2>}>
              <Button onClick={()=>{alert(`Your Cart placed Successfully your bill is : $ ${bill.toFixed(2)}`)}} variant='contained' color='success'><FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'20px'}}/></Button>
            </Tooltip>
            </table> :<h1>Your Cart Is Empty Try Our Game If Not Feeling To Buy </h1>}
            
          </Drawer>

    </div>
    <img src='https://thumbs.gfycat.com/AdvancedFilthyKoala-max-1mb.gif' width='8%' style={{}} alt='' />
    <Tooltip arrow title={<h2>MENU</h2>}>
    <Button onClick={()=>{setDra(true)}}><MenuIcon style={{color:'white',fontSize:'50px'}}/>
    </Button>
    </Tooltip>
    
    </div>
    
  )
}

export default Nav