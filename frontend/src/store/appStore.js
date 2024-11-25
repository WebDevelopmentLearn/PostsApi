import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import postsReducer from "./reducers/postsSlice";
import usersReducer from "./reducers/usersSlice";

const rootReducer = configureStore({
    reducer: {
        authReducer,
        postsReducer,
        usersReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    //     .concat(localCartMiddleware)
});

export default rootReducer;