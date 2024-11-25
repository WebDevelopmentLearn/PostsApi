import styles from "./CreatePostForm.module.scss";
import {ImageUpload} from "../ImageUpload/ImageUpload";

export const CreatePostForm = ({submitPost, isAuthenticated, setImage}) => {
    return (
        <form onSubmit={(event) => submitPost(event)} className={styles.CreatePostForm}>
            <h1>Create Post</h1>
            <input type="text" placeholder="Title"/>
            <textarea className={styles.PostContentArea} placeholder="Content"/>
            {isAuthenticated && <div>
                <ImageUpload onImageSelect={setImage}/>
            </div>}
            <button>Submit</button>
        </form>
    )
}