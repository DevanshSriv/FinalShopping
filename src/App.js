import './App.css';
import Nav from './Nav';
import {Parent} from './Parent';
import Products from './Products';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Session from './Session';
import Filter from './Filter';
function App() {
  
  return (
    <div className="App" id='lightPage'>
      <Parent>
      <Nav/>
      
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/game' element={<Home/>}/>
        <Route path='/session' element={<Session/>}/>
        <Route path='/Result' element={<Filter/>}/>
      </Routes>
      </Parent>
      
    </div>
    
  );
}

export default App;
