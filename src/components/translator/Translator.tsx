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

interface TranslatorProps {
    sourceLanguage: string,
    targetLanguage: string
}

export function Translator (props: TranslatorProps) {
    const [translationRequest, setTranslationRequest] = useState<string>("")
    const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(true)
    const [data, isLoading, error] = useRequestData(`${baseUrl}get-translations`, reload)
    
    const renderData = data && data.translations.map((translation: TextProps) => {
        return <GptAnswers 
                    key={translation.id} 
                    question={translation.question} 
                    answer={translation.answer}
                    handleDeleteQuestion={() => handleDeleteQuestion(translation.id)}
                />
    })

    const handleDeleteQuestion = (translationId: string) => {
        const cookies = parseCookies()

        axios.delete(`${baseUrl}delete-translation/${translationId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => setReload(!reload)).catch(err => alert(err.response.data.error))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingChat(true)
        const cookies = parseCookies()

        const body = {
            source_language: props.sourceLanguage,
            target_language: props.targetLanguage,
            text: translationRequest
        }

        axios.post(`${baseUrl}create-translation`, body, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => {
            setIsLoadingChat(false)
            setReload(!reload)
            setTranslationRequest("")
            const textarea = document.getElementById("textArea")
            textarea!.style.height = "auto"
        }).catch(err => {
            setIsLoadingChat(false)
            setReload(!reload)
            setTranslationRequest("")
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
                textValue={translationRequest} 
                setTextValue={setTranslationRequest}
                isLoading={isLoadingChat}
                languagesFilledOut={props.sourceLanguage !== "" && props.targetLanguage !== ""}
            />
        </>
    )
}