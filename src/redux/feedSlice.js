import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action) => action.payload,
        removeFeed:(state,action) => null,
        removeUserFromFeed:(state,action) => {
            const filteredFeed = state.filter((item)=>item._id!==action.payload)
            return filteredFeed;
        }
    }
})

export const {addFeed,removeFeed,removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer