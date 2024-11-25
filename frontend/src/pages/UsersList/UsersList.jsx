import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUsers} from "../../store/reducers/actionCreators";
import {UserCard} from "../../components";
import styles from "./UsersList.module.scss";
export const UsersList = () => {

    const {users} = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div>
            <h1>Users List</h1>
            <ul className={styles.UsersList}>
                {(users.length > 0 && users) ? users.map((user) => (
                    // <li key={user.id}>{user.username}</li>
                    <UserCard key={user.id} user={user}/>
                )) : <p>No users found</p>}
            </ul>
        </div>
    )
}