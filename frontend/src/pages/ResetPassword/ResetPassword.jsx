import styles from "./ResetPassword.module.scss";
import {resetPassword} from "../../store/reducers/actionCreators";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {ResetPasswordForm} from "../../components";

export const ResetPassword = () => {
   return (
       <div className={styles.ResetPassword}>
           <ResetPasswordForm />
       </div>
   )
}