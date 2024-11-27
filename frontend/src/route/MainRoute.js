import {Route, Routes} from "react-router-dom";
import {
    ForgotPassword,
    ForgotPasswordForm,
    Home,
    Login,
    Profile,
    ProtectedRoute,
    Register,
    ResetPassword,
    UsersList
} from "../pages";


const MainRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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