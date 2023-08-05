import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentCustomer: null,
        isFetching: false,
        error: false,
    },
    reducers: {
      
        getUserStart: (state)=>{
            state.isFetching = true;
            state.error = false
        },
        getUserSuccess: (state, action) =>{
            // console.log(state.data)
                state.currentCustomer = action.payload.data
        },
        getUserFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) =>{
            state.currentCustomer = null
            state.error= false
        },
    },
});

export const { logOut,getUserStart, getUserSuccess, getUserFailure } = userSlice.actions;
export const selectUser = (state) => state.user
export default userSlice.reducer;