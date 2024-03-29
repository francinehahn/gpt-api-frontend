import React, { useState, useEffect, FormEvent } from "react"
import Router from "next/router"
import Head from "next/head"
import Link from "next/link"

import axios from "axios"
import {addHours } from 'date-fns'
import { setCookie, parseCookies } from "nookies"
import {BsEye, BsEyeSlash} from 'react-icons/bs'

import {Loading} from '@/components/loading/loading'
import { Header } from "@/components/header/Header"
import { baseUrl } from "../../constants/baseUrl"

import styles from "./styles.module.scss"

export default function Login() {
    useEffect(() => {
        const cookies = parseCookies()
        if (cookies.token) {
            Router.push("/home")
        }
    }, [])

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [axiosError, setAxiosError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [inputType, setInputType] = useState<string>("password")

    const isButtonDisabled = email === "" || password === ""

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setEmailError("")
        setPasswordError("")
        setAxiosError("")
        
        if (email === "") {
            setEmailError("Informe o seu email")
            setIsLoading(false)
        }
        if (password === "" || password.length < 8) {
            setPasswordError("A senha deve ter pelo menos 8 caracteres")
            setIsLoading(false)
        }
        if (email !== "" && password.length >= 8) {
            const body = {email, password}

            axios.post(`${baseUrl}users/login`, body).then(response => {
                setIsLoading(false)
                setCookie(null, 'token', JSON.stringify({ token: response.data.token, expDate: addHours(new Date(), 24) }), {
                    expires: addHours(new Date(), 24),
                    path: '/',
                  })
            
                Router.push("/home")
            }).catch(error => {
                setIsLoading(false)
                setAxiosError("E-mail ou senha incorretos")
            })
        }
    }

    return (
        <>
            <Head>
                <title>Login | ChatAI</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="O melhor chat de inteligência artificial"/>
                <meta name="keywords" content="chat, inteligência artificial, openai, chatgpt"/>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <main className={styles.container}>
                <Header/>
                <h2>Entre na sua conta</h2>

                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input 
                            className={`${emailError && styles.error}`}
                            type={'email'} 
                            placeholder="maria.santos@gmail.com" 
                            name="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                        <p>{emailError}</p>
                    </div>

                    <div>
                        <label htmlFor="password">Senha</label>
                        <span className={styles.password}>
                            <input 
                                className={`${passwordError && styles.error}`}
                                type={inputType} 
                                placeholder="********" 
                                name="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                            />
                            {
                                inputType === "password"? <BsEyeSlash onClick={() => setInputType("text")}/> : 
                                <BsEye onClick={() => setInputType("password")}/>
                            }
                        </span>
                        <p>{passwordError}</p>
                    </div>

                    <p>{axiosError}</p>
                    <button disabled={isButtonDisabled}>{isLoading? <Loading button={true}/> : "Entrar"}</button>
                </form>

                <span className={styles.span}>
                    <p>Não possui uma conta?</p>
                    <Link href="/signup">Clique aqui.</Link>
                </span>
            </main>
        </>
    )
}