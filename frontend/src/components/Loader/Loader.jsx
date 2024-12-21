import styles from "./Loader.module.scss";

export const Loader = ({size = "40px", color = "black", speed = "0.9s", stroke = "5px",}) => {
    const style = {
        "--uib-size": size,
        "--uib-color": color,
        "--uib-speed": speed,
        "--uib-stroke": stroke,
    };

    return (
        <div className={styles.loader} style={style}></div>
    )
}