import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import postsReducer from "./reducers/postsSlice";

const rootReducer = configureStore({
    reducer: {
        authReducer,
        postsReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    //     .concat(localCartMiddleware)
});

export default rootReducer;