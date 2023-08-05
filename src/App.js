import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import FormSetting from './pages/formsetting/FormSetting';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './mocks/auth';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    getUser(dispatch)
  }, [])
 const user  = useSelector((state)=>state?.user)
 console.log(user)
  return (
    <div className="App">
    <Router>
    <Routes>
     
    {user && user.currentCustomer == null && <Route exact path='/login' element={<Login/>} />} 
   {user && user?.currentCustomer !==null && <Route exact path='/' element={<Home />} /> }
    
    <Route exact path='/signup' element={<Signup/>} /> 
    <Route exact path='/formsetting' element={<FormSetting  /> } />
    </Routes>
    </Router>
    </div>
  );
}
export default App;
