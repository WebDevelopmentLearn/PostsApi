import {useForm} from "react-hook-form";
import styles from "./RegisterForm.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../store/reducers/actionCreators";
export const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
    });
    const dispatch = useDispatch();
    const {registerStatus, error} = useSelector((state) => state.authReducer);
    const navigate = useNavigate();

    const submitForm = (data) => {
        console.log(data);
        const registerData = {
            username: data.usernameInput,
            email: data.emailInput,
            password: data.passwordInput,
        }
        console.log(registerData);
        dispatch(registerUser(registerData));
    }

    useEffect(() => {
        if (registerStatus === "FAILED") {
            alert(error);
        }
        if (registerStatus === "SUCCEEDED") {
            alert("Registration successful");
            navigate("/login");

        }
    }, [dispatch, registerStatus]);

    return (
        <form className={styles.RegisterForm} onSubmit={handleSubmit(submitForm)} action="">
            <h1>Register</h1>
            <input {...register("usernameInput", {
                required: {
                    value: true,
                    message: "This field is required",
                },
                minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters long",
                },
            })} type="text" placeholder="Username"/>
            {errors.usernameInput && <p style={{color: "#b73939", fontWeight: "500"}}>{errors.usernameInput.message}</p>}
            <input {...register("emailInput", {
                required: {
                    value: true,
                    message: "This field is required",
                },
                pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                },
            })} type="text" placeholder="Email"/>
            {errors.emailInput && <p style={{color: "#b73939", fontWeight: "500"}}>{errors.emailInput.message}</p>}
            <input {...register("passwordInput", {
                required: {
                    value: true,
                    message: "This field is required"
                },
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                }
            })} type="password" placeholder="Password"/>
            {errors.passwordInput && <p style={{color: "#b73939", fontWeight: "500"}}>{errors.passwordInput.message}</p>}
            <button className={styles.RegisterBtn} type="submit">Register</button>
        </form>
    )
}