import {useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {API_URL, createPost, fetchPosts, fetchUser, logout, uploadAvatar} from "../../store/reducers/actionCreators";
import styles from "./Profile.module.scss";
import avatar from "../../assets/profile/avatar150.png";
import {ImageUpload} from "../../components";

export const Profile = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer);
    const {posts} = useSelector((state) => state.postsReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = (event) => {
        if (event.target.className === styles.Modal) {
            setIsModalOpen(false);
        }

    }

    const submitUploadAvatar = async (event) => {
        event.preventDefault();
        try {
            const form = new FormData();
            if (!image) {
                alert("Please select an image");
                return;
            }
            console.log("File size (KB):", image.size / 1024);
            console.log("File type:", image.type);
            if (image.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB!");
                return;
            }
            form.append('avatar', image);
            const result = await dispatch(uploadAvatar(form)).unwrap();
            if (result.error) {
                alert("Failed to update avatar: " + result.error.message);
            } else {
                alert("Avatar successfully updated");
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            alert("Failed to update avatar: " + error.message);
        }
    }

    return (
        <div className={styles.Profile}>
            <h1>Profile</h1>
            <div className={styles.ProfileContainer}>
                <div className={styles.ProfileAvatar}>
                    {/*<img src={avatar} alt="profile"/>*/}
                    {/*<img src={`${API_URL}${user.avatar}`} alt=""/>*/}
                    <img src={`${API_URL}${user.avatar}?t=${new Date().getTime()}`} alt="User Avatar"/>
                    <button className={styles.UploadAvatarBtn} onClick={handleOpenModal}>Upload avatar</button>
                </div>
                <div className={styles.ProfileDetails}>
                    <h2>UserId: {user ? user.id : "Loading..."}</h2>
                    <h2>Username: {user ? user.username : "Loading..."}</h2>
                    <h2>Email: {user ? user.email : "Loading..."}</h2>
                    <h2>Posts count: {result}</h2>
                    <button className={styles.LogoutBtn} onClick={handleLogout}>Logout</button>
                </div>
                {isModalOpen && (
                    <div className={styles.Modal} onClick={handleCloseModal}>
                        <div className={styles.ModalContent}>
                            <h2>Upload avatar</h2>
                            <ImageUpload onImageSelect={setImage}/>
                            <button className={styles.UploadAvatarSubmitBtn} onClick={submitUploadAvatar}>Upload</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}