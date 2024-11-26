import styles from "./ChangePasswordForm.module.css";
import {useForm} from "react-hook-form";
import {changePassword} from "../../store/reducers/actionCreators";
import {useDispatch} from "react-redux";

export const ChangePasswordForm = () => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        mode: "onChange",
    });

    const dispatch = useDispatch();

    const submitForm = async (data) => {
        try {
            console.log("Inputs data: ", data);
            const passwordData = {
                currentPassword: data.currentPasswordInput,
                newPassword: data.newPasswordInput,
                confirmNewPassword: data.confirmNewPasswordInput,
            }
            console.log("Password data: ", passwordData);
            const result = await dispatch(changePassword(passwordData)).unwrap();
            if (result.error) {
                alert("Failed to change password: " + result.error.message);
            } else {
                alert("Password changed successfully");
            }
        } catch (error) {
            console.error("Error changing password: ", error);
            alert("Failed to change password: " + error.response.data);
        }
    }

    return (
        <form className={styles.ChangePasswordForm} onSubmit={handleSubmit(submitForm)} action="">
            <h1 className={styles.ChangePasswordHeader}>Change Password</h1>
            <input {...register("currentPasswordInput", {
                required: {
                    value: true,
                    message: "This field is required",
                }
            })} type="password" placeholder="Current Password" autoComplete="current-password"/>
            {errors.currentPasswordInput && <p style={{color: "#b73939", fontWeight: "500"}}>{errors.currentPasswordInput.message}</p>}
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