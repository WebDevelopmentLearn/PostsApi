import {RegisterForm} from "../../components";
import styles from "./Register.module.scss";

export const Register = () => {
    return (
        <div className={styles.Register}>
            <RegisterForm />
        </div>
    )
}