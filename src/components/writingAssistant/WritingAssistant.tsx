import { useState, FormEvent } from "react"
import { useRequestData } from "@/hooks/useRequestData"
import { baseUrl } from "@/constants/baseUrl"
import { Loading } from "../loading/Loading"
import { GptAnswers } from "../gptAnswers/gptAnswers"
import styles from "./styles.module.scss"
import { ChatInput } from "../chatInput/chatInput"
import axios from "axios"
import { parseCookies } from "nookies"

interface TextProps {
    answer: string,
    created_at: string,
    id: string,
    question: string,
    user_id: string
}

export function WritingAssistant () {
    const [writingRequest, setWritingRequest] = useState<string>("")
    const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false)
    const [isLoadingDeletion, setIsLoadingDeletion] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(true)
    const [data, isLoading, error] = useRequestData(`${baseUrl}get-texts`, reload)
    
    const renderData = data && data.texts.map((text: TextProps) => {
        return <GptAnswers 
                    key={text.id} 
                    question={text.question} 
                    answer={text.answer}
                    handleDeleteQuestion={() => handleDeleteQuestion(text.id)}
                    isLoading={isLoadingDeletion}
                />
    })

    const handleDeleteQuestion = (textId: string) => {
        setIsLoadingDeletion(true)
        const cookies = parseCookies()

        axios.delete(`${baseUrl}delete-text/${textId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => {
            setIsLoadingDeletion(false)
            setReload(!reload)
        }).catch(err => {
            setIsLoadingDeletion(false)
            alert(err.response.data.error)
        })
    }

    const handleSubmitText = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingChat(true)
        const cookies = parseCookies()

        const body = {text: writingRequest}

        axios.post(`${baseUrl}create-text`, body, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => {
            setIsLoadingChat(false)
            setReload(!reload)
            setWritingRequest("")
            const textarea = document.getElementById("textArea")
            textarea!.style.height = "auto"
        }).catch(err => {
            setIsLoadingChat(false)
            setReload(!reload)
            setWritingRequest("")
            alert(err.response.data.error)
        })
    }

    return (
        <>
            <div className={styles.chatAnswer}>
                {isLoading && <Loading button={false}/>}
                {!isLoading && data && renderData}
                {!isLoading && error && <p>{error}</p>}
            </div>
            <ChatInput 
                handleSubmit={handleSubmitText} 
                textValue={writingRequest} 
                setTextValue={setWritingRequest}
                isLoading={isLoadingChat}
            />
        </>
    )
}