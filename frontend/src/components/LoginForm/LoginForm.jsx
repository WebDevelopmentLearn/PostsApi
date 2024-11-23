import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/reducers/actionCreators";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {

    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const {status, isAuthenticated} = useSelector((state) => state.authReducer);
    const navigate = useNavigate();


    const submitForm = (data) => {
        console.log(data);
        const userData = {
            username: data.usernameOrEmailInput,
            password: data.passwordInput
        }
        dispatch(login(userData));
    }

    useEffect(() => {
        if(status === "SUCCEEDED" && isAuthenticated) {
            navigate("/");
        }
    }, [status, isAuthenticated, navigate]);

    return (
        <form className={styles.LoginForm} onSubmit={handleSubmit(submitForm)} action="">
            <h1 className={styles.LoginHeader}>Login</h1>
            <input {...register("usernameOrEmailInput", {
                required: {
                    value: true,
                    message: "This field is required"
                }
            })} type="text" placeholder="Username or Email"/>
            <input {...register("passwordInput", {
                required: {
                    value: true,
                    message: "This field is required"
                }
            })} type="password" placeholder="Password"/>
            <button className={styles.LoginBtn} type="submit">Login</button>
        </form>
    )
}