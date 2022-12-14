import { Alert, Box, Button, FormControl, FormControlLabel, Input, Stack} from '@mui/material'
import React, { memo, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faCartShopping, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Context } from './Parent'
import Tooltip from '@mui/material/Tooltip'
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal'
import './submit.css'
import { confirmAlert } from 'react-confirm-alert'
import HomeIcon from '@mui/icons-material/Home';
const Nav = () => {
  const nav= useNavigate()
    const [dra,setDra]=useState(false)
    const [dra1,setDra1]=useState(false)
    const Cont=useContext(Context)
    const warn=<h3>Yout Cart Will Be Cleared</h3>
    const count=Cont.cart[0].length;
    const [openM1,setOpenM1]=useState(false)
    const [openM2,setOpenM2]=useState(false)
    // let errors='',severity='';
    const [errors,setErrors]=useState('')
    const [severity,setSeverity]=useState('')
    const [errors1,setErrors1]=useState('')
    const [severity1,setSeverity1]=useState('')
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '40vw',
      
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      
    };
    const style1 = {
      position: 'absolute',
      top: '50%',
      left: '60%',
      transform: 'translate(-50%, -50%)',
      width: '30vw',
      height:'70vh',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      
    };
     //login below//
     const loginFN=(e)=>{
      e.preventDefault()
      let email=document.getElementById('logE').value
      let pass=document.getElementById('logPass').value
      
      setErrors1('')
      setSeverity1('')
      let exists=Cont.users[0].filter(items=> Object.keys(items).toString()==email)
      if(exists.length==0){
        setErrors1('User does not Exists')
      setSeverity1('error')
      return;
      }
      console.log(exists)
      if(exists[0][email]==pass){
        let user=email.substring(0,email.indexOf('@'))
        Cont.perso[1](user)
        document.getElementsByClassName('btn1')[0].classList.add('btn')
        document.getElementsByClassName('ticks1')[0].setAttribute('id','tick')
        setErrors1('Congratulations You are Logged IN')
        setSeverity1('success')
        setTimeout(()=>{
          setOpenM1(false)
        },2000)
        document.getElementById('login').disabled=true
       
        
      }else{
        
        setErrors1('Password Doesnt Match')
        setSeverity1('error')
        document.getElementById('login').disabled=false
      }
      console.log(errors)
    }
    
    //Signup below//
    const signFN=(e)=>{
      e.preventDefault()
      let email=document.getElementById('signE').value
      let pass=document.getElementById('signP').value
      let Cpass=document.getElementById('signCP').value
      setErrors('')
      setSeverity('')
      let exists=Cont.users[0].filter(items=> Object.keys(items).toString()==email)
      console.log(exists.length)
      if(pass==Cpass && exists.length==0){
        let user=[...Cont.users[0],{[email]:pass}]
        Cont.users[1](user)
        document.getElementsByClassName('btn2')[0].classList.add('btn')
        document.getElementsByClassName('ticks')[0].setAttribute('id','tick')
        setErrors('Congratulations You are Registered')
        setSeverity('success')
        setTimeout(()=>{
          setOpenM2(false)
        },2000)
      }else{
        
        setErrors('Password Doesnt Match or User Exists')
        setSeverity('error')
        
      }
      console.log(errors)
    }
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
    useEffect(()=>{
      if(Cont.swit[0]==true){
        let main=document.getElementsByClassName('App')
        main[0].setAttribute('id','darkPage')
        document.getElementsByTagName('html')[0].setAttribute('id','darkPage')
        // console.log(document.querySelectorAll('#cards'));
        let card=document.querySelectorAll('.cards')
        card.forEach(item=>{item.setAttribute('id','darkPage')})
        let h=document.querySelectorAll("h1, h2, h3, h4, h5, h6,placeholder")
        h.forEach(item=>{item.setAttribute('style','color:white')})
        let nav=document.getElementsByClassName('nav')
        nav[0].setAttribute('id','darkPage')
        document.getElementsByClassName('search')[0].style.border='2px solid white'
        document.getElementById('query').style.backgroundColor='white'
        document.getElementsByClassName('seaIcon')[0].style.color='white'
      }else{
        document.getElementsByTagName('html')[0].removeAttribute('id','darkPage')
        let main=document.getElementsByClassName('App')
        main[0].setAttribute('id','lightPage')
        let card=document.querySelectorAll('.cards')
        card.forEach(item=>{item.removeAttribute('id')})
        let h=document.querySelectorAll("h1, h2, h3, h4, h5, h6,placeholder")
        h.forEach(item=>{item.removeAttribute('style')})
        let nav=document.getElementsByClassName('nav')
        nav[0].removeAttribute('id')
        document.getElementsByClassName('search')[0].style.border='1px solid black'
        document.getElementById('query').style.backgroundColor='transparent'
        document.getElementsByClassName('seaIcon')[0].style.color='black'
      }
      
    },[Cont.swit[0]])
 const stageSearch=()=>{
  let query=document.getElementById('query').value
  query=query.toLowerCase()
  let newAr=Cont.products[0].filter(items=> items.title.toLowerCase().includes(query)|| items.category.toLowerCase().includes(query))
  console.log(newAr)
  Cont.filter[1](newAr)
  nav('/Result')
  
 }
 
 useEffect(()=>{
 if(Cont.perso[0]==''){
   document.getElementById('menu').style.color='red'
 }else{
  document.getElementById('menu').style.color='green'
 }
 },[Cont.perso[0]])

// bill and cart....below

const Cart=()=>{
  if(Cont.perso[0]!='')
  {
    alert(`Your Cart placed Successfully your bill is : $ ${bill.toFixed(2)}`)
  }else{
    alert(`Your Cart placed Successfully your bill is : $ ${bill.toFixed(2)}  Please LogIn to Purchase`)
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
    <Link className='links' to='/game' onClick={()=>{document.getElementsByClassName('nav')[0].style.display='none'}}>&#x1F3AE;</Link>
    </Tooltip>
    <Drawer
            anchor={'left'}
            open={dra}
            onClose={()=>{setDra(false)}}
            className='drawe'
          >
            <div className='draLeft'>
            <Link to='/' ><HomeIcon sx={{color:'blue',fontSize:'30px'}}/></Link>
            <hr style={{width:'20vw'}}/>
            <div className='search'> <Input placeholder='Search' sx={{fontSize:'20px'}}/><Tooltip arrow title={<h3>Press to search</h3>} ><SearchIcon className='iconSearch' sx={{fontSize:'40px',cursor:'pointer'}} onClick={stageSearch}/></Tooltip></div>
            <FormControlLabel control={<Switch onChange={(e)=>{Cont.swit[1](e.target.checked)}} checked={Cont.swit[0]}/>} label="Theme" />
            <hr style={{width:'20vw'}}/>
            <Button variant='outlined' id='login' color='success' onClick={()=>{setOpenM1(true)}} >{Cont.perso[0]==''?'Login':Cont.perso[0]}</Button>
            <Button variant='outlined' sx={{display:`${Cont.perso[0]===''?'none':'block'}`}} color='error' onClick={()=>{Cont.perso[1]('');alert('Logged out Success')}} >Logout</Button>
            </div>
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
              <Button onClick={Cart} variant='contained' color='success'><FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'20px'}}/></Button>
            </Tooltip>
            </table> :<h1>Your Cart Is Empty Try Our Game If Not Feeling To Buy </h1>}
            
          </Drawer>

    </div>
   <div className='search'> <Input placeholder='Search' sx={{fontSize:'20px'}} id='query' onChange={(e)=>{Cont.search[1](e.target.value)}}/><Tooltip arrow title={<h3>Press to search</h3>} ><SearchIcon sx={{fontSize:'40px',cursor:'pointer'}} onClick={stageSearch} className='seaIcon'/></Tooltip></div>
    <img src='https://www.seekpng.com/png/full/841-8415925_5519-lincoln-ave-blue-store-icon-png.png' width='8%'  alt='' style={{filter:'brightness(200%)'}}/>
    <Tooltip arrow title={Cont.perso[0]==''? <h3>Please Log In here</h3>:<h3>Menu</h3>}>
    <Button onClick={()=>{setDra(true)}}><MenuIcon style={{fontSize:'50px',backgroundColor:'white',borderTopLeftRadius:'20px',borderBottomRightRadius:'20px'}} id='menu'/>
    </Button>
    </Tooltip>
    

    <Modal
        open={openM1}
        onClose={()=>{setOpenM1(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Login</h2>
          <form   onSubmit={loginFN} style={{height:'30vh',display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'center'}}>
          <Input placeholder='Email' required type='email' id='logE'/>
          <Input placeholder='password' type='password' required id='logPass'/>
          <Button type='submit' className="btn1"><span>Submit</span><img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="70" width="70" alt='' className='ticks1'/></Button>
          </form>
          <Alert severity={severity1}>{errors1}</Alert>
          <h5 style={{textDecoration:'underline',color:'blue',cursor:'pointer'}} onClick={()=>{setOpenM2(true)}}>Not a Member yet?</h5>
        </Box>
        
      </Modal>
      <Modal
        open={openM2}
        onClose={()=>{setOpenM2(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <h4>Create Account</h4>
          <form   onSubmit={signFN} style={{height:'60vh',display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'center'}}>
          <Input placeholder='Email Id' type='email' id='signE' required/>
          <Input placeholder='Password' type='password' id='signP' required/>
          <Input placeholder='Re-type Password' type='password' id='signCP' required/>
          <Button type='submit' className="btn2"><span>Submit</span><img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="70" width="70" alt='' className='ticks'/></Button>
          
           {/* {alert(errors)} */}
           {/* <Alert severity={severity}>{errors}</Alert> */}
           <Alert severity={severity}>{errors}</Alert>
          
    
          </form>
        </Box>
      </Modal>
    </div>
    
  )
}

export default memo(Nav)