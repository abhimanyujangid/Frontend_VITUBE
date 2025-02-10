import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlic";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
       
    }
});

// Define types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;