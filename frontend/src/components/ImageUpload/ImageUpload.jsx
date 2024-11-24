import {useState} from "react";
import {useDispatch} from "react-redux";
import {uploadImage} from "../../store/reducers/actionCreators";

export const ImageUpload = ({ onImageSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const dispatch = useDispatch();
    // Обработчик выбора файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageSelect(file); // Передаем выбранное изображение в родительскую форму
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Обработчик отправки файла
    const handleUpload = async (e) => {
        e.preventDefault();


    };

    return (
        <div style={{margin: "16px"}}>
            <input style={{display: "none"}} id="uploadImage" type="file" accept="image/*" onChange={handleFileChange}/>
            <label style={{border: "1px dashed #000000", padding: "16px"}} htmlFor="uploadImage">Click for upload image</label>
            {preview && <img src={preview} alt="Preview" style={{width: '200px', marginTop: '10px'}}/>}
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}