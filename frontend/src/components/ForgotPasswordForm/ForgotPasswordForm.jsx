import {useDispatch} from "react-redux";
import {forgotPassword} from "../../store/reducers/actionCreators";
import styles from "./ForgotPasswordForm.module.scss";
export const ForgotPasswordForm = () => {

    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
       try {
           e.preventDefault();
           const email = e.target[0].value;
           const result = await dispatch(forgotPassword({
               email: email
           })).unwrap();
           if (result.error) {
               alert("Failed to forgot password: " + result.error.message);
           } else {
               alert(`An email with instructions on password recovery has been sent to the specified address: ${email}`);
           }
       } catch (error) {
           console.error("Error with forgot password: ", error);
           alert("Error: " + error.message);
       }
    }

    return (
        <form className={styles.ForgotPasswordForm} onSubmit={handleSubmit} action="">
            <h1 className={styles.ForgotPasswordHeader}>Forgot password</h1>
            <input type="email" placeholder="Email" />
            <button className={styles.ForgotPasswordBtn}>Send email</button>
        </form>
    )
}