// accountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        currentAccount: null,
    },
    reducers: {
        setCurrentAccount: (state, action) => {
            state.currentAccount = action.payload;
        },
    },
});

export const { setCurrentAccount } = accountSlice.actions;
export const selectCurrentAccount = (state) => state.account.currentAccount;
export default accountSlice.reducer;