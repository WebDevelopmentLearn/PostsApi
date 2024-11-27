import styles from "./ResetPassword.module.scss";
import {resetPassword} from "../../store/reducers/actionCreators";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

export const ResetPassword = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        mode: "onChange",
    });

    const [searchParams] = useSearchParams(); // Получаем объект строки запроса

    // Извлекаем значения параметров
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submitForm = async (data) => {
        try {
            console.log("Inputs data: ", data);
            const passwordData = {
                token: token,
                id: id,
                newPassword: data.newPasswordInput,
                confirmNewPassword: data.confirmNewPasswordInput,
            }
            console.log("Password data: ", passwordData);
            const result = await dispatch(resetPassword(passwordData)).unwrap();
            if (result.error) {
                alert("Failed to change password: " + result.error.message);
            } else {
                alert("Password changed successfully");
                navigate("/login");

            }
        } catch (error) {
            console.error("Error changing password: ", error);
            alert("Failed to change password: " + error.response.data);
        }
    }

    return (
        <form className={styles.ChangePasswordForm} onSubmit={handleSubmit(submitForm)} action="">
            <h1 className={styles.ChangePasswordHeader}>Reset Password</h1>
            <input {...register("newPasswordInput", {
                required: {
                    value: true,
                    message: "This field is required",
                }
            })} type="password" placeholder="New Password" autoComplete="new-password"/>
            {errors.newPasswordInput && <p style={{color: "#b73939", fontWeight: "500"}}>{errors.newPasswordInput.message}</p>}
            <input {...register("confirmNewPasswordInput", {
                required: {
                    value: true,
                    message: "This field is required",
                },
                validate: (value) => {
                    if (watch("newPasswordInput") !== value) {
                        return "Your passwords do no match";
                    }
                },
            })} type="password" placeholder="Confirm New Password" autoComplete="new-password"/>
            {errors.confirmNewPasswordInput && <p style={{color: "#b73939", fontWeight: "500"}}>{errors.confirmNewPasswordInput.message}</p>}
            <button className={styles.ChangePasswordBtn} type="submit">Change Password</button>
        </form>
    )
}