import {ForgotPasswordForm} from "../../components";
import styles from "./ForgotPassword.module.scss";
export const ForgotPassword = () => {
    return (
        <div className={styles.ForgotPassword}>
            <ForgotPasswordForm />
        </div>
    )
}