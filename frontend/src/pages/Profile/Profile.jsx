import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, logout} from "../../store/reducers/actionCreators";

export const Profile = () => {
    // const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    function handleLogout() {
        dispatch(logout());

    }

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <h2>UserId: {user ? user.id : "Loading..."}</h2>
                <h2>Username: {user ? user.username : "Loading..."}</h2>
                <h2>Email: {user ? user.email : "Loading..."}</h2>
                <h2>Posts: </h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}