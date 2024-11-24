import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPosts, fetchUser, createPost, deletePost, uploadImage, API_URL} from "../../store/reducers/actionCreators";
import styles from "./Home.module.scss";
import {ImageUpload} from "../../components";

export const Home = () => {
    const dispatch = useDispatch();
    const {posts, status} = useSelector((state) => state.postsReducer);
    const {isAuthenticated, user} = useSelector((state) => state.authReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null); // Для хранения выбранного изображения


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

        // Создаем FormData для отправки данных
        const form = new FormData();
        form.append('title', title);
        form.append('content', content);


        if (image) {
            form.append('image', image); // Добавляем изображение в запрос
        }


        dispatch(createPost(form));
        dispatch(fetchPosts());

        setIsModalOpen(false);

    }

    const handleDeletePost = (postId) => {
        console.log(postId);
        dispatch(deletePost(postId));
        dispatch(fetchPosts());
        if (status === "SUCCEEDED") {
            alert("Post successfully deleted");
        }

    }

    useEffect(() => {
        dispatch(fetchPosts());
        console.log(user?.username);
    }, [dispatch]);


    return (
        <div>
            <h1>Home</h1>
            <ul className={styles.PostsList}>
                {posts.length > 0 ? posts.map((post) => (
                    <li key={post._id}>
                        <p>
                            <strong>{post.title}</strong>
                        </p>
                        <div className={styles.PostContents}>

                            <p>{post.content}</p>
                            <p><strong>Author</strong>: {post.author.username}</p>
                            {post.image && <img src={`${API_URL}${post.image}`} alt="Post" style={{maxWidth: '50%'}}/>}
                        </div>
                        {(isAuthenticated && post.author._id === user.id) &&
                            <button onClick={() => handleDeletePost(post._id)} className={styles.DeletePostBtn}>
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.5001 6H3.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path
                                        d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
                                        stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M9.5 11L10 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M14.5 11L14 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path
                                        d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                        stroke="#1C274C" strokeWidth="1.5"/>
                                </svg>
                            </button>}
                    </li>
                )) : <p>No posts found</p>}
            </ul>
            {isAuthenticated && <button className={styles.AddPostBtn} onClick={openModal}>+</button>}
            {isModalOpen && <div onClick={(event) => closeModal(event)} className={styles.Modal}>
                <form onSubmit={(event) => submitPost(event)} className={styles.CreatePostForm}>
                    <h1>Create Post</h1>
                    <input type="text" placeholder="Title" />
                    <textarea className={styles.PostContentArea} placeholder="Content" />
                    {isAuthenticated && <div>
                        <ImageUpload onImageSelect={setImage} />
                    </div>}
                    <button>Submit</button>
                </form>
            </div>}
        </div>
    )
}