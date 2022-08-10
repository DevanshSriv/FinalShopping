import React, { useState } from 'react'
const Context = React.createContext()
const Parent = (props) => {
  const [cart,setCart]=useState([])
  const [products,setProducts]=useState([])
  const [search,setSearch]=useState('')
  const [filter,setFilter]=useState([])
  const [swit,setSwit]=useState(false)
  const [users,setUsers]=useState([])
  const [perso,setPerso]=useState('')
  return (
    <Context.Provider value={{
        products:[products,setProducts],
        cart:[cart,setCart],
        search:[search,setSearch],
        filter:[filter,setFilter],
        swit:[swit,setSwit],
        users:[users,setUsers],
        perso:[perso,setPerso]
    }}>
        {props.children}
    </Context.Provider>
  )
}

export {Parent,Context}