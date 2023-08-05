import axios from "axios"
import { getUserFailure, getUserStart, getUserSuccess,} from "../redux/userRedux";
export const authenticateSignup = async(user) =>{
    try{
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/userapp/auth/register`, user)
        return res;
    }catch(err){
        return err;
    }
}

export const authenticateLogin = async(user) =>{

    try{
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/userapp/auth/login`, user);
        // console.log(res)
        if(res?.data?.status==='SUCCESS'){
            // console.log(res)
            localStorage.setItem('auth-token', res?.data?.data?.authtoken)
            return true;
        }else{
            return false
        }
    }catch(err){
    
        return err
    }

}

export const getUser = async(dispatch) =>{
// console.log(localStorage.getItem("auth-token"))
const TOKEN = localStorage.getItem("auth-token")
    dispatch(getUserStart());
    try{
         
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/userapp/auth/get`,
       {
        headers: {"auth-token": TOKEN}
    });
 
        if(res?.data?.status==='SUCCESS'){
            // console.log(res)
            if(TOKEN){
                dispatch(getUserSuccess(res.data));
                return res;
            }else{
                return false
            }
        }else{
            return false
        }
    }catch(err){
        dispatch(getUserFailure());
        return err
    }

}



