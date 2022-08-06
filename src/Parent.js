import React, { useState } from 'react'
const Context = React.createContext()
const Parent = (props) => {
  const [cart,setCart]=useState([])
  const [products,setProducts]=useState([])
  return (
    <Context.Provider value={{
        products:[products,setProducts],
        cart:[cart,setCart]
    }}>
        {props.children}
    </Context.Provider>
  )
}

export {Parent,Context}