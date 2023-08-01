import { FormEvent, KeyboardEvent, useRef } from "react"
import { AiOutlineSend } from "react-icons/ai"
import styles from "./styles.module.scss"

interface PropsInput {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    textValue: string,
    setTextValue: (x: string) => void,
    isLoading: boolean,
    languagesFilledOut?: boolean
}

export function ChatInput(props: PropsInput) {
    const formRef = useRef<HTMLFormElement>(null)

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

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }))
        }
    }

    return (
        <div className={styles.chatInput}>
            <form ref={formRef} onSubmit={props.handleSubmit}>
                <textarea 
                    id="textArea"
                    className={styles["resizable-textarea"]}
                    rows={1}
                    placeholder="Digite aqui" 
                    value={props.textValue} 
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                />
                {
                    props.languagesFilledOut === undefined && (
                        <button disabled={props.textValue.trim() === ""}>
                            {props.isLoading? <p>...</p> : <AiOutlineSend/>}
                        </button>
                    )
                }

                {
                    props.languagesFilledOut !== undefined && (
                        <button disabled={props.textValue.trim() === "" || !props.languagesFilledOut}>
                            {props.isLoading? <p>...</p> : <AiOutlineSend/>}
                        </button>
                    )
                }
            </form>
        </div>
    )
}