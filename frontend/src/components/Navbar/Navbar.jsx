import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.scss";
import {useSelector} from "react-redux";
export const Navbar = () => {
    const {isAuthenticated, user} = useSelector((state) => state.authReducer);

    return (
        <div className={styles.Navbar}>
            <h3>Posts API</h3>
            <div className={styles.LinksList}>
                <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/">Home</NavLink>
                {!isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/login">Login</NavLink>}
                {!isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/register">Register</NavLink>}
                {isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/profile">Profile</NavLink>}
                {(isAuthenticated && user?.role === "admin") && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/users">Users List</NavLink>}
            </div>
        </div>
    )
}