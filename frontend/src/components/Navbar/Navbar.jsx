import {Link, NavLink} from "react-router-dom";
import styles from "./Navbar.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {API_URL, logout} from "../../store/reducers/actionCreators";
export const Navbar = () => {
    const {isAuthenticated, user} = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <div className={styles.Navbar}>
            <h3>Posts API</h3>
            <div className={styles.LinksList}>
                <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/">Home</NavLink>
                {!isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/login">Login</NavLink>}
                {!isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/register">Register</NavLink>}
                {/*{isAuthenticated && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/profile">Profile</NavLink>}*/}
                {(isAuthenticated && user?.role === "admin") && <NavLink className={({isActive}) => isActive ? styles.isActive : ""} to="/users">Users List</NavLink>}
            </div>
            {isAuthenticated && <Link className={styles.ProfileLink} to={"/profile"}>
                <img src={`${API_URL}${user?.avatar}`} alt="user_avatar"/>
            </Link>}
        </div>
    )
}