import React, { useState, FormEvent } from "react"

import axios from "axios"
import { parseCookies } from "nookies"

import { useRequestData } from "../../hooks/useRequestData"
import { baseUrl } from "../../constants/baseUrl"
import {Loading} from '@/components/loading/loading'
import { GptAnswers } from "../gptAnswers/gptAnswers"
import { ChatInput } from "../chatInput/chatInput"

import styles from "./styles.module.scss"

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
    const [isLoadingRegenerate, setIsLoadingRegenerate] = useState<boolean>(false)
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
        const cookies = JSON.parse(parseCookies().token)

        axios.delete(`${baseUrl}delete-text/${textId}`, {
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

    const handleRegenerate = () => {
        setIsLoadingRegenerate(true)
        const cookies = JSON.parse(parseCookies().token)
        
        axios.patch(`${baseUrl}regenerate-text`, null, {
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
                textValue={writingRequest} 
                setTextValue={setWritingRequest}
                isLoadingChat={isLoadingChat}
                isLoadingRegenerate={isLoadingRegenerate}
            />
        </>
    )
}