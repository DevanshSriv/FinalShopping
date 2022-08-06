import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Session = () => {
    const nav=useNavigate()
   useEffect(()=>{
    nav('/')
   },[])
  return (
    <></>
    
  )
}

export default Session