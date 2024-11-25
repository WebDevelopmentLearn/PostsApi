import {useState} from "react";
import styles from "./ExpandableText.module.scss";



export const ExpandableText = ({textClass, text, maxHeight = 100}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.expandableTextContainer}>
            <div
                className={`${textClass} ${isExpanded ? styles.expandableText : ""}`}
                style={{ maxHeight: isExpanded ? "100%" : `${maxHeight}px` }}>
                {/*<p style={{whiteSpace: "pre-wrap"}}>{text}</p>*/}

                <p style={{whiteSpace: "pre-wrap"}}>{text}</p>
                {/*{(video && video !== "video_url") && (*/}
                {/*    <div style={{marginTop: "16px"}}>*/}
                {/*        <h3>Видеодемонстрация: </h3>*/}
                {/*        <iframe*/}
                {/*            src={video}*/}
                {/*            style={{*/}
                {/*                objectFit: "contain"*/}
                {/*            }}*/}
                {/*            width="100%"*/}
                {/*            height="320px"*/}
                {/*            title={title}*/}
                {/*            frameBorder="0"*/}
                {/*            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
                {/*            allowFullScreen*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
            <button onClick={toggleExpand} className={styles.expandBtn}>
                {isExpanded ? "Скрыть" : "Раскрыть полностью"}
            </button>
        </div>
    );
}