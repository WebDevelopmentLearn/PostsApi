import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import postsReducer from "./reducers/postsSlice";
import {saveTokenToStorageMiddleware} from "../middlewares/saveTokenToStorageMiddleware";

const rootReducer = configureStore({
    reducer: {
        authReducer,
        postsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(saveTokenToStorageMiddleware)
});

export default rootReducer;