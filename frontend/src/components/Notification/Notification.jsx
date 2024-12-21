import styles from "./Notification.module.scss";
import {useEffect} from "react";

export const Notification = ({type = "INFO", message = "OK", fullMessage = ""}) => {

    // useEffect(() => {
    //     setTimeout(() => {
    //      
    //     })
    // }, []);

    const getStatusFromType = (statusType) => {
        switch (statusType) {
            case "WARN":
                return "warn_icon";
            case "ERROR":
                return "error_icon";
            case "FATAL":
                return "fatal_icon";
            default:
                return "info_icon";
        }
    }

    return (
        <>
         <div className={styles.Notification}>
             <div>
                 <p>{message}</p>
                 <button>X</button>
             </div>
             <div>
                 <img src="" alt={getStatusFromType(type)}/>
                 <p>{fullMessage}</p>
             </div>

         </div>
        </>
    )
}