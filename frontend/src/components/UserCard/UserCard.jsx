import styles from './UserCard.module.scss';
import {API_URL, deleteUser, fetchUsers} from "../../store/reducers/actionCreators";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
export const UserCard = ({user, admin}) => {

    const dispatch = useDispatch();
    const handleDeleteUser = async () => {
        try {
            const result = await dispatch(deleteUser(user._id)).unwrap();
            if (result.error) {
                alert("Failed to delete user: " + result.error.message);
            } else {
                alert("User successfully deleted");
                dispatch(fetchUsers());
            }
        } catch (error) {
            console.error("Error deleting user: ", error);
            alert("Failed to delete user: " + error.response.data);
        }
    }

    console.log("Rendering UserCard");

    return (
        <div className={styles.UserCard}>
            <div className={styles.UserAvatar}>
                <img src={`${API_URL}${user.avatar}`} alt={user.avatar}/>
            </div>
            <div className={styles.UserInfo}>
                <h3>Username: {user.username}</h3>
                <h4>Userid: {user._id}</h4>
                <h4>Email: {user.email}</h4>
                <h4>Posts: {user.posts.length}</h4>
                {admin.id !== user._id && <button onClick={handleDeleteUser} className={styles.DeleteUserBtn}>Delete</button>}
            </div>
        </div>
    )
}