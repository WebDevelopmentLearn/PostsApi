import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
export const Navbar = () => {
    const {isAuthenticated} = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();




    return (
        <div className={styles.Navbar}>
            <h3>Posts API</h3>
            <div className={styles.LinksList}>
                <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/">Home</NavLink>
                {!isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/login">Login</NavLink>}
                {!isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/register">Register</NavLink>}
                {isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/profile">Profile</NavLink>}
            </div>
        </div>
    )
}