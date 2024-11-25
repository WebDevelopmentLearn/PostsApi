import {useState} from "react";
import styles from "./ImageUpload.module.scss";
export const ImageUpload = ({ onImageSelect }) => {

    const [preview, setPreview] = useState(null);

    // Обработчик выбора файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageSelect(file); // Передаем выбранное изображение в родительскую форму
            setPreview(URL.createObjectURL(file));
        }
    };


    return (
        <div className={styles.ImageUpload}>
            <input style={{display: "none"}} id="uploadImage" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange}/>
            <label style={{border: "1px dashed #000000", padding: "16px", cursor: "pointer"}} htmlFor="uploadImage">Click for upload image</label>
            {preview && <img src={preview} alt="Preview" style={{width: '200px', marginTop: '10px'}}/>}
        </div>
    );
}