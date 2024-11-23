import {Navigate, Route, Routes} from "react-router-dom";
import {Home, Login, Profile, ProtectedRoute, Register} from "../pages";


const MainRoute = ({user}) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />

        </Routes>
    );
}

export default MainRoute;