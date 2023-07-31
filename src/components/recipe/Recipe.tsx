import { useState, FormEvent } from "react"
import { useRequestData } from "@/hooks/useRequestData"
import { baseUrl } from "@/constants/baseUrl"
import { Loading } from "../loading/Loading"
import { GptAnswers } from "../gptAnswers/gptAnswers"
import styles from "./styles.module.scss"
import { ChatInput } from "../chatInput/chatInput"
import axios from "axios"
import { parseCookies } from "nookies"

interface RecipeProps {
    answer: string,
    created_at: string,
    id: string,
    question: string,
    user_id: string
}

export function Recipe () {
    const [textValue, setTextValue] = useState<string>("")
    const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false)
    const [isLoadingDeletion, setIsLoadingDeletion] = useState<boolean>(false)
    const [reload, setReload] = useState(true)
    const [data, isLoading, error] = useRequestData(`${baseUrl}get-recipes`, reload)
    const cookies = parseCookies()

    const renderData = data && data.recipes.map((recipe: RecipeProps) => {
        return <GptAnswers 
                    key={recipe.id} 
                    question={recipe.question} 
                    answer={recipe.answer}
                    handleDeleteQuestion={() => handleDeleteQuestion(recipe.id)}
                    isLoading={isLoadingDeletion}
                />
    })

    const handleDeleteQuestion = (recipeId: string) => {
        setIsLoadingDeletion(true)
        axios.delete(`${baseUrl}delete-recipe/${recipeId}`, {
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingChat(true)

        const body = {ingredients: textValue}

        axios.post(`${baseUrl}create-recipe`, body, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(() => {
            setIsLoadingChat(false)
            setReload(!reload)
            setTextValue("")
        }).catch(err => {
            setIsLoadingChat(false)
            setReload(!reload)
            setTextValue("")
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
                textValue={textValue} 
                setTextValue={setTextValue}
                isLoading={isLoadingChat}
            />
        </>
    )
}