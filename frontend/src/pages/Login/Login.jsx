import {LoginForm} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Login.module.scss";

export const Login = () => {

    const {status, isAuthenticated} = useSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        // if (status === "SUCCEEDED" || isAuthenticated) {
        //     // window.location.href = "/profile";
        //     navigate("/profile");
        // }
    }, [dispatch]);

    return (
        <div className={styles.Login}>
            <LoginForm />
        </div>
    )
}