import React from "react"
import Image from "next/image"
import {MdDeleteOutline} from "react-icons/md"
import logo from "../../../public/favicon.png"
import styles from "./styles.module.scss"
import { DotAnimation } from "../dotAnimation/DotAnimation"

interface PropsAnswers {
    question: string,
    answer: string,
    handleDeleteQuestion: (id: string) => void,
    isLoading: boolean
}

export function GptAnswers(props: PropsAnswers) {
    return (
        <div className={styles.container}>
            <span className={styles.question}>
                <span>
                    <p>Eu</p>
                    <p>{props.question}</p>
                </span>
                {props.isLoading? <DotAnimation/> : <MdDeleteOutline onClick={props.handleDeleteQuestion}/>}
            </span>
            <span className={styles.answer}>
                <Image src={logo} alt="Logo do chatAI"/>
                <p>{props.answer}</p>
            </span>
        </div>
    )
}