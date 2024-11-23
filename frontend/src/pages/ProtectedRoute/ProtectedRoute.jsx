import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({children}) => {

    const {isAuthenticated} = useSelector((state) => state.authReducer);

    return isAuthenticated ? children : <Navigate to="/login" />;
}