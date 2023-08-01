import {useState, useEffect} from "react"
import axios from "axios"
import { parseCookies } from "nookies"

export function useRequestData(url: string, reload: boolean) {
    const [data, setData] = useState<any>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const cookies = JSON.parse(parseCookies().token)

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(response => {
            setData(response.data)
            setIsLoading(false)
        }).catch(err => {
            setError(err.response.data.error)
            setIsLoading(false)
        })
    }, [url, reload])

    return [data, isLoading, error]
}