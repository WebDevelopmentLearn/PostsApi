import {useDispatch} from "react-redux";
import {forgotPassword} from "../../store/reducers/actionCreators";

export const ForgotPassword = () => {

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        dispatch(forgotPassword({
            email: email
        }));
    }

    return (
        <form onSubmit={handleSubmit} action="">
            <input type="email" placeholder="Email" />
            <button>Send email</button>
        </form>
    )
}