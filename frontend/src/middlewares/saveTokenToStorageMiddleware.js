
export const saveTokenToStorageMiddleware = store => next => action => {
    if (action.type === "auth/login/fulfilled") {
        localStorage.setItem("accessToken", action.payload.accessToken);
    }
    if (action.type === "auth/logout/fulfilled") {
        localStorage.removeItem("accessToken");
    }
    next(action);
};