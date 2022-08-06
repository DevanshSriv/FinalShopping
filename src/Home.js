import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import "./Home.css"

const Home = () => {
  let doc=document.body.getElementsByTagName('div')
  doc.info.style.display='block'
  let can=document.body.getElementsByTagName('canvas')
  can.c.style.display='block'
  let scr= document.body.getElementsByTagName('script')
  scr[0].nextElementSibling.style.display='block'
  console.log(scr)
  return (
    <div>
         
    </div>
  )
}

export default Home