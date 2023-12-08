import { configureStore } from "@reduxjs/toolkit";

import contractReducer from "../features/icoContractSlice";
import accountReducer from "../features/accountSlice";

export const store = configureStore({
    reducer: {
        contract: contractReducer,
        account: accountReducer,
    }
});