import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPosts, fetchUser, createPost, deletePost, uploadImage, API_URL} from "../../store/reducers/actionCreators";
import styles from "./Home.module.scss";
import {CreatePostForm, ImageUpload, PostCard} from "../../components";

export const Home = () => {
    const dispatch = useDispatch();
    const {posts, status, createPostStatus, error} = useSelector((state) => state.postsReducer);
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

    const submitPost = async (event) => {
        event.preventDefault();
        const title = event.target[0].value;
        const content = event.target[1].value;
        // console.log(title, content);

       try {
           // Создаем FormData для отправки данных
           const form = new FormData();
           form.append('title', title);
           form.append('content', content);
           if (image) {
               form.append('image', image); // Добавляем изображение в запрос
           }

           //dispatch(createPost(form));
           const result = await dispatch(createPost(form)).unwrap();
           // dispatch(fetchPosts());

           if (result.error) {
                alert("Failed to create post: " + result.error.message);
           } else {
                alert("Post successfully created");
                setIsModalOpen(false);
                dispatch(fetchPosts());
           }
       } catch (error) {
           console.log(error);
           alert("Failed to create post: " + error.message);
       }
    }

    const handleDeletePost = async (postId) => {
        console.log(postId);

        try {
            const result = await dispatch(deletePost(postId)).unwrap();
            if (result.error) {
                alert("Failed to delete post: " + result.error.message);
            } else {
                alert("Post successfully deleted");
                dispatch(fetchPosts());
            }
        } catch (error) {
            console.log(error);
            alert("Failed to delete post: " + error.message);
        }

    }

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch, isAuthenticated, user]);

    // const handleRefreshPosts = () => {
    //     dispatch(fetchPosts());
    // }

    // useEffect(() => {
    //     console.log("Posts after fetch:", posts);
    //     console.log("isAuthenticated:", isAuthenticated);
    //     console.log("user:", user);
    // }, [posts, isAuthenticated, user]);

    return (
        <div>
            <h1>Home</h1>
            <ul className={styles.PostsList}>
                {posts.length > 0 ? posts.map((post) => (
                    <PostCard key={post._id} post={post} isAuthenticated={isAuthenticated} user={user} handleDeletePost={handleDeletePost}/>
                )) : <p>No posts found</p>}
            </ul>
            {/*<div>*/}
            {/*    <button onClick={handleRefreshPosts}>Refresh posts</button>*/}
            {/*</div>*/}
            {isAuthenticated && <button className={styles.AddPostBtn} onClick={openModal}>+</button>}
            {isModalOpen && <div onClick={(event) => closeModal(event)} className={styles.Modal}>
                <CreatePostForm submitPost={submitPost} isAuthenticated={isAuthenticated} setImage={setImage}/>
            </div>}
        </div>
    )
}