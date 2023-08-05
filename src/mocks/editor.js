import axios from "axios";
import { addEditorFailure, addEditorStart, addEditorSuccess, deleteEditorFailure, deleteEditorStart, deleteEditorSuccess, getEditorStart, getEditorSuccess, updateEditorFailure, updateEditorStart, updateEditorSuccess } from "../redux/editorRedux";

export const addForm = async(dispatch, data) =>{
    const TOKEN = localStorage.getItem("auth-token")
    dispatch(addEditorStart());
    try{
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}userapp/create`,data,
       {
        headers: {"auth-token": TOKEN}
    });
    // console.log(res)
        // console.log(res)
        if(res?.data?.status==='SUCCESS'){
            console.log(res)
            dispatch(addEditorSuccess(res.data));
            return res;
        }else{
            return false
        }
    }catch(err){
        dispatch(addEditorFailure());
        return err
    }

}

export const updateForm = async(dispatch,id, data) =>{
    const TOKEN = localStorage.getItem("auth-token")
    dispatch(updateEditorStart());
    try{
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}userapp/update/${id}`,data,
       {
        headers: {"auth-token": TOKEN}
    });
    // console.log(res)
        // console.log(res)
        if(res?.data?.status==='SUCCESS'){
          
            dispatch(updateEditorSuccess(res.data));
            console.log(res)
            return res;
        }else{
            return false
        }
    }catch(err){
        dispatch(updateEditorFailure());
        return err
    }

}

export const DeleteForm = async(dispatch,id) =>{
    console.log(id)
    const TOKEN = localStorage.getItem("auth-token")
    dispatch(deleteEditorStart());
    try{
    //     const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/update/${id}`,data,
    //    {
    //     headers: {"auth-token": TOKEN}
    // });
    // console.log(res)
        // console.log(res)
        
        
          dispatch(deleteEditorSuccess(id));
            // console.log(res)
            return true
     
    }catch(err){
        dispatch(deleteEditorFailure());
        return err
    }

}