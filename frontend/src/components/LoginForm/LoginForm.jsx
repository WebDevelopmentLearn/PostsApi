import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, login} from "../../store/reducers/actionCreators";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.scss";
import {Loader} from "../Loader/Loader";

export const LoginForm = () => {

    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const {loginStatus, isAuthenticated} = useSelector((state) => state.authReducer);
    const navigate = useNavigate();


    const submitForm = async (data) => {
        try {
            const userData = {
                username: data.usernameOrEmailInput,
                password: data.passwordInput
            }
            const result = await dispatch(login(userData)).unwrap();
            if (result.error) {
                alert("Failed to login: " + result.error.message);
            } else {
                alert("Login successful1");
            }
        } catch (error) {

            console.error("Error logging in: ", error);
            alert("Failed to login: " + error);
        }
    }

    useEffect(() => {
        if(loginStatus === "SUCCEEDED" && isAuthenticated) {
            navigate("/");
            dispatch(fetchUser());
        }
    }, [loginStatus, isAuthenticated, navigate]);

    return (
        <form className={styles.LoginForm} onSubmit={handleSubmit(submitForm)} action="">
            <h1 className={styles.LoginHeader}>Login</h1>
            <input {...register("usernameOrEmailInput", {
                required: {
                    value: true,
                    message: "This field is required"
                }
            })} type="text" placeholder="Username or Email" autoComplete="current-password"/>
            <input {...register("passwordInput", {
                required: {
                    value: true,
                    message: "This field is required"
                }
            })} type="password" placeholder="Password" autoComplete="current-password"/>
            <button className={styles.LoginBtn} type="submit">{
                loginStatus === "LOADING" ? <Loader  size="20px" stroke="3px"/> : "Login"
            }</button>
            <Link to={"/register"}>Don't have an account? Register</Link>
            <Link to={"/forgot-password"}>Forgot password?</Link>
        </form>
    )
}