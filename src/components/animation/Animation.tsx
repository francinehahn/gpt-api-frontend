import styles from "./styles.module.scss"
import { BsChatTextFill, BsFillFileTextFill } from "react-icons/bs"
import { MdFastfood } from "react-icons/md"
import { SiMicrosofttranslator } from "react-icons/si"

interface animationProps {
    title: string,
    description: string
}

export function Animation (props: animationProps) {
    return (
        <div className={styles.animation}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            {props.title.includes("escrita") && <BsChatTextFill/>}
            {props.title.includes("receitas") && <MdFastfood/>}
            {props.title.includes("resumos") && <BsFillFileTextFill/>}
            {props.title.includes("Tradutor") && <SiMicrosofttranslator/>}
        </div>
    )
}