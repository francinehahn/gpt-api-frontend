import { FormEvent, KeyboardEvent, useRef } from "react"
import { AiOutlineSend } from "react-icons/ai"
import { GrPowerCycle } from "react-icons/gr"
import styles from "./styles.module.scss"

interface PropsInput {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    handleRegenerate: () => void,
    textValue: string,
    setTextValue: (x: string) => void,
    isLoadingChat: boolean,
    isLoadingRegenerate: boolean,
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
                <button type="button" className={styles.regenerate} onClick={props.handleRegenerate}>
                    {!props.isLoadingRegenerate && <GrPowerCycle/>}
                    {props.isLoadingRegenerate? "..." : "Reenviar"}
                </button>
                
                <div>
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
                                {props.isLoadingChat? <p>...</p> : <AiOutlineSend/>}
                            </button>
                        )
                    }

                    {
                        props.languagesFilledOut !== undefined && (
                            <button disabled={props.textValue.trim() === "" || !props.languagesFilledOut}>
                                {props.isLoadingChat? <p>...</p> : <AiOutlineSend/>}
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    )
}