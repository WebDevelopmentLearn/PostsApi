import {Navigate, Route, Routes} from "react-router-dom";
import {Home, Login, Profile, ProtectedRoute, Register, UsersList} from "../pages";


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
            <Route path="/users" element={
                <ProtectedRoute>
                    <UsersList />
                </ProtectedRoute>
            } />

        </Routes>
    );
}

export default MainRoute;