import React, { useState, FormEvent } from "react"

import axios from "axios"
import { parseCookies } from "nookies"

import { useRequestData } from "../../hooks/useRequestData"
import { baseUrl } from "../../constants/baseUrl"
import { Loading } from "../loading/loading"
import { GptAnswers } from "../../components/gptAnswers/gptAnswers"
import { ChatInput } from "../../components/chatInput/chatInput"

import styles from "./styles.module.scss"

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
    const [isLoadingDeletion, setIsLoadingDeletion] = useState<boolean>(false)
    const [isLoadingRegenerate, setIsLoadingRegenerate] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(true)
    const [data, isLoading, error] = useRequestData(`${baseUrl}get-translations`, reload)
    
    const renderData = data && data.translations.map((translation: TextProps) => {
        return <GptAnswers 
                    key={translation.id} 
                    question={translation.question} 
                    answer={translation.answer}
                    handleDeleteQuestion={() => handleDeleteQuestion(translation.id)}
                    isLoading={isLoadingDeletion}
                />
    })

    const handleDeleteQuestion = (translationId: string) => {
        setIsLoadingDeletion(true)
        const cookies = JSON.parse(parseCookies().token)

        axios.delete(`${baseUrl}delete-translation/${translationId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => {
            setReload(!reload)
            setIsLoadingDeletion(false)
        }).catch(err => {
            setIsLoadingDeletion(false)
            alert("Créditos da API da OpenAI excedidos. Tente novamente mais tarde.")
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingChat(true)
        const cookies = JSON.parse(parseCookies().token)

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

    const handleRegenerate = () => {
        setIsLoadingRegenerate(true)
        const cookies = JSON.parse(parseCookies().token)
        const body = {
            source_language: props.sourceLanguage,
            target_language: props.targetLanguage
        }

        axios.patch(`${baseUrl}regenerate-translation`, body, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => {
            setIsLoadingRegenerate(false)
            setReload(!reload)
        }).catch(err => {
            setIsLoadingRegenerate(false)
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
                handleRegenerate={handleRegenerate}
                textValue={translationRequest} 
                setTextValue={setTranslationRequest}
                isLoadingChat={isLoadingChat}
                isLoadingRegenerate={isLoadingRegenerate}
                languagesFilledOut={props.sourceLanguage !== "" && props.targetLanguage !== ""}
            />
        </>
    )
}