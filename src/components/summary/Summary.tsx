import React, { useState, FormEvent } from "react"

import axios from "axios"
import { parseCookies } from "nookies"

import { useRequestData } from "../../hooks/useRequestData"
import { baseUrl } from "../../constants/baseUrl"
import {Loading} from '@/components/loading/loading'
import { GptAnswers } from "../gptAnswers/gptAnswers"
import { ChatInput } from "../chatInput/chatInput"

import styles from "./styles.module.scss"

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
    const [isLoadingDeletion, setIsLoadingDeletion] = useState<boolean>(false)
    const [isLoadingRegenerate, setIsLoadingRegenerate] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(true)
    const [data, isLoading, error] = useRequestData(`${baseUrl}get-summaries`, reload)

    const renderData = data && data.summaries.map((summary: SummaryProps) => {
        return <GptAnswers 
                    key={summary.id} 
                    question={summary.question} 
                    answer={summary.answer}
                    handleDeleteQuestion={() => handleDeleteQuestion(summary.id)}
                    isLoading={isLoadingDeletion}
                />
    })

    const handleDeleteQuestion = (summaryId: string) => {
        setIsLoadingDeletion(true)
        const cookies = JSON.parse(parseCookies().token)

        axios.delete(`${baseUrl}delete-summary/${summaryId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => {
            setReload(!reload)
            setIsLoadingDeletion(false)
        }).catch(err => {
            alert(err.response.data.error)
            setIsLoadingDeletion(false)
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingChat(true)
        const cookies = JSON.parse(parseCookies().token)

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
            alert("Créditos da API da OpenAI excedidos. Tente novamente mais tarde.")
        })
    }

    const handleRegenerate = () => {
        setIsLoadingRegenerate(true)
        const cookies = JSON.parse(parseCookies().token)

        axios.patch(`${baseUrl}regenerate-summary`, null, {
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
                textValue={summaryRequest} 
                setTextValue={setSummaryRequest}
                isLoadingChat={isLoadingChat}
                isLoadingRegenerate={isLoadingRegenerate}
            />
        </>
    )
}