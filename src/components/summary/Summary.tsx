import { useState, FormEvent } from "react"
import { useRequestData } from "@/hooks/useRequestData"
import { baseUrl } from "@/constants/baseUrl"
import { Loading } from "../loading/Loading"
import { GptAnswers } from "../gptAnswers/gptAnswers"
import styles from "./styles.module.scss"
import { ChatInput } from "../chatInput/chatInput"
import axios from "axios"
import { parseCookies } from "nookies"

interface SummaryProps {
    answer: string,
    created_at: string,
    id: string,
    question: string,
    user_id: string
}

export function Summary () {
    const [summaryRequest, setSummaryRequest] = useState<string>("")
    const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(true)
    const [data, isLoading, error] = useRequestData(`${baseUrl}get-summaries`, reload)

    const renderData = data && data.summaries.map((summary: SummaryProps) => {
        return <GptAnswers 
                    key={summary.id} 
                    question={summary.question} 
                    answer={summary.answer}
                    handleDeleteQuestion={() => handleDeleteQuestion(summary.id)}
                />
    })

    const handleDeleteQuestion = (summaryId: string) => {
        const cookies = parseCookies()

        axios.delete(`${baseUrl}delete-summary/${summaryId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => setReload(!reload)).catch(err => alert(err.response.data.error))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingChat(true)
        const cookies = parseCookies()

        const body = {text: summaryRequest}

        axios.post(`${baseUrl}create-summary`, body, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => {
            setIsLoadingChat(false)
            setReload(!reload)
            setSummaryRequest("")
            const textarea = document.getElementById("textArea")
            textarea!.style.height = "auto"
        }).catch(err => {
            setIsLoadingChat(false)
            setSummaryRequest("")
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
                handleSubmit={handleSubmit} 
                textValue={summaryRequest} 
                setTextValue={setSummaryRequest}
                isLoading={isLoadingChat}
            />
        </>
    )
}