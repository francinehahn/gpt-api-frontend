import { useState, FormEvent } from "react"
import { AiOutlineSend } from "react-icons/ai"
import styles from "./styles.module.scss"

interface PropsInput {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    textValue: string,
    setTextValue: (x: string) => void,
    isLoading: boolean
}

export function ChatInput(props: PropsInput) {
    const adjustTextAreaHeight = () => {
        const textarea = document.getElementById("textArea")
        if (textarea) {
            textarea.style.height = "auto"
            const newHeight = textarea.scrollHeight
            textarea.style.height = newHeight + "px"
        }
    }

    const handleTextChange = (e: any) => {
        props.setTextValue(e.target.value)
        adjustTextAreaHeight()
    }

    return (
        <div className={styles.chatInput}>
            <form onSubmit={props.handleSubmit}>
                <textarea 
                    id="textArea"
                    className={styles["resizable-textarea"]}
                    rows={1}
                    placeholder="Digite aqui" 
                    value={props.textValue} 
                    onChange={handleTextChange}
                />
                <button disabled={props.textValue.trim() === ""}>
                    {props.isLoading? <p>...</p> : <AiOutlineSend/>}
                </button>
            </form>
        </div>
    )
}