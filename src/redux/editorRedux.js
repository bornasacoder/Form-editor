import {createSlice} from "@reduxjs/toolkit";

const editorSlice = createSlice({
    name: "editor",
    initialState: {
        editor: {},
        isFetching: false,
        error: false,
    },
    reducers: {
      
        getEditorStart: (state)=>{
            state.isFetching = true;
            state.error = false
        },
        getEditorSuccess: (state, action) =>{
            // console.log(state.data)
                state.editor = action.payload.data
        },
        getEditorFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        addEditorStart:(state)=>{
            state.isFetching = true;
            state.error = false
        },
        addEditorSuccess:(state, action)=>{
            state.editor = {...action.payload.data}
        },
        addEditorFailure:(state)=>{
            state.isFetching = false;
            state.error = true
        },
        updateEditorStart: (state)=>{
            state.isFetching = true;
            state.error = false
        },
        updateEditorSuccess:(state, action)=>{

            state.editor = {...action.payload.data}
        },
        updateEditorFailure :(state)=>{
            state.isFetching = false;
            state.error = true
        },
        deleteEditorStart:(state)=>{
            state.isFetching = true;
            state.error = false
        },
        deleteEditorSuccess :(state,action) =>{
            let id = action.payload
            console.log(id)
            console.log(state.editor)
            // console.log(state.editor.fields.filter((item)=>{ return item.id !==id }))
            state.editor.fields.splice(id, 1)
            // console.log(data)
            // state.editor.fields 
        },
        deleteEditorFailure:(state)=>{
            state.isFetching = false;
            state.error = true
        }

    },
});

export const {getEditorStart,getEditorSuccess,getEditorFailure, addEditorStart,addEditorSuccess,addEditorFailure,updateEditorStart,updateEditorSuccess,updateEditorFailure, deleteEditorStart, deleteEditorSuccess,deleteEditorFailure } = editorSlice.actions;
export const selectEditor = (state) => state.editor
export default editorSlice.reducer;