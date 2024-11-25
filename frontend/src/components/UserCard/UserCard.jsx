import styles from './UserCard.module.scss';
import {API_URL} from "../../store/reducers/actionCreators";
export const UserCard = ({user}) => {
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
            </div>
        </div>
    )
}