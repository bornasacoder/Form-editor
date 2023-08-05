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
  const user  = useSelector((state)=>state?.user)
  console.log(user)
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  useEffect(()=>{
    getUser(dispatch)
  }, [dispatch])
  return (
    <div className="App">
    <Router>
    <Routes>
     
    <Route exact path='/login' element={<Login/>} /> 
 <Route exact path='/' element={ user.currentCustomer !==null ? <Home /> : <Login/>} /> 
    
    <Route exact path='/signup' element={<Signup/>} /> 
    <Route exact path='/formsetting' element={<FormSetting  /> } />
    </Routes>
    </Router>
    </div>
  );
}
export default App;
