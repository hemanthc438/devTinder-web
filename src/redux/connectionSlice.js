import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:'connections',
    initialState:{
        connections:null,
        requests:null
    },
    reducers:{
        addConnections: (state,action)=>{
            state.connections=action.payload
        },
        removeConnections:(state,action)=>null,
        addRequests: (state, action) => {
            state.requests = action.payload;
            },
        removeRequests:(state,action)=>null
    }
})
export const {addConnections,removeConnections,addRequests,removeRequests} = connectionSlice.actions;

export default connectionSlice.reducer;