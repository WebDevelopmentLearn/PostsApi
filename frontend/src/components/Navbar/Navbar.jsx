import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
export const Navbar = () => {
    const {isAuthenticated} = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();




    return (
        <div className={styles.Navbar}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
        </div>
    )
}