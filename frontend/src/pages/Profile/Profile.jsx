import {useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, logout} from "../../store/reducers/actionCreators";
import styles from "./Profile.module.scss";
import avatar from "../../assets/profile/avatar150.png";

export const Profile = () => {
    // const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer);
    const {posts} = useSelector((state) => state.postsReducer);

    const calculatePosts = useCallback(() => {
        return posts.filter((post) => post.author._id === user.id).length;
    }, [posts, user.id]);

    const result = calculatePosts();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    function handleLogout() {
        dispatch(logout());

    }

    return (
        <div className={styles.Profile}>
            <h1>Profile</h1>
            <div className={styles.ProfileContainer}>
                <div className={styles.ProfileAvatar}>
                    {/*TODO: Implement getting an avatar from the server*/}
                    <img src={avatar} alt="profile"/>
                </div>
                <div className={styles.ProfileDetails}>
                    <h2>UserId: {user ? user.id : "Loading..."}</h2>
                    <h2>Username: {user ? user.username : "Loading..."}</h2>
                    <h2>Email: {user ? user.email : "Loading..."}</h2>
                    <h2>Posts count: {result}</h2>
                    <button className={styles.LogoutBtn} onClick={handleLogout}>Logout</button>
                </div>

            </div>
        </div>
    )
}