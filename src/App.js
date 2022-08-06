import './App.css';
import Nav from './Nav';
import {Parent} from './Parent';
import Products from './Products';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Session from './Session';
function App() {
  
  return (
    <div className="App">
      <Parent>
      <Nav/>
      
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/game' element={<Home/>}/>
        <Route path='/session' element={<Session/>}/>
      </Routes>
      </Parent>
      
    </div>
    
  );
}

export default App;
