import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPosts, fetchUser} from "../../store/reducers/actionCreators";
import styles from "./Home.module.scss";

export const Home = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector((state) => state.postsReducer);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <h1>Home</h1>
            <ul className={styles.PostsList}>
                {posts?.map((post) => (
                    <li key={post._id}>
                        <p>
                            <strong>{post.title}</strong>
                        </p>
                        <p>{post.content}</p>
                        <p>Author: {post.author.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}