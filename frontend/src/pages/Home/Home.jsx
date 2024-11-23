import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPosts, fetchUser, createPost} from "../../store/reducers/actionCreators";
import styles from "./Home.module.scss";

export const Home = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector((state) => state.postsReducer);
    const {isAuthenticated} = useSelector((state) => state.authReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = (event) => {
        if (event.target.className === styles.Modal) {
            setIsModalOpen(false);
        }
    }

    const submitPost = (event) => {
        event.preventDefault();
        const title = event.target[0].value;
        const content = event.target[1].value;
        // console.log(title, content);
        dispatch(createPost({title, content}));
        dispatch(fetchPosts());
        setIsModalOpen(false);
    }

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
            {isAuthenticated && <button className={styles.AddPostBtn} onClick={openModal}>+</button>}
            {isModalOpen && <div onClick={(event) => closeModal(event)} className={styles.Modal}>
                <form onSubmit={(event) => submitPost(event)} className={styles.CreatePostForm}>
                    <h1>Create Post</h1>
                    <input type="text" placeholder="Title" />
                    <textarea placeholder="Content" />
                    <button>Submit</button>
                </form>
            </div>}
        </div>
    )
}