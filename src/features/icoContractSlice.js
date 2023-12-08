// contractSlice.js
import { createSlice } from '@reduxjs/toolkit';

const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        ico: null, // Initial state is set to null, replace with your default contract data if needed
    },
    reducers: {
        setContract: (state, action) => {
            state.ico = action.payload;
        },
    },
});

export const { setContract } = contractSlice.actions;
export const selectContract = (state) => state.contract.ico;
export default contractSlice.reducer;