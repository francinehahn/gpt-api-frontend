import Head from "next/head"
import Router from "next/router"
import { useState, FormEvent, ChangeEvent, useEffect } from "react"

import axios from "axios"
import { parseCookies } from "nookies"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"

import { baseUrl } from "../../constants/baseUrl"
import { Loading } from "../../components/loading/Loading"

import styles from "./styles.module.scss"
import Link from "next/link"
import { Header } from "@/components/header/Header"


export default function Signup () {
    useEffect(() => {
        const cookies = parseCookies()
        if (cookies.token) {
            Router.push("/home")
        }
    }, [])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [nameError, setNameError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [repeatPasswordError, setRepeatPasswordError] = useState("")
    const [axiosError, setAxiosError] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const [inputTypePass, setInputTypePass] = useState("password")
    const [inputTypeRepeatPass, setInputTypeRepeatPass] = useState("password")

    const isButtonDisabled = name === "" || email === "" || phone === "" || password === "" || repeatPassword === ""

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawPhoneNumber = e.target.value.replace(/\D/g, '')
        const formattedPhoneNumber = formatPhoneNumber(rawPhoneNumber)
        setPhone(formattedPhoneNumber)
    }
    
    const formatPhoneNumber = (rawPhoneNumber: string) => {
        const ddd = rawPhoneNumber.substring(0, 2)
        const firstPart = rawPhoneNumber.substring(2, 7)
        const secondPart = rawPhoneNumber.substring(7, 11)
    
        return `(${ddd}) ${firstPart}-${secondPart}`
    }

    const handleSignup = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setNameError("")
        setPhoneError("")
        setEmailError("")
        setPasswordError("")
        setAxiosError("")

        if (name.length < 8 || !name.includes(" ")) {
            setNameError("Informe o seu nome completo")
        }
        if (phone.length !== 15) {
            setPhoneError("Informe o seu número de celular com 11 dígitos")
        }
        if (email === "") {
            setEmailError("Informe o seu email")
        }
        if (password.length < 8) {
            setPasswordError("A senha deve ter pelo menos 8 caracteres")
        }
        if (password !== repeatPassword) {
            setRepeatPasswordError("A senha deve ser a mesma que a digitada anteriormente")
        }

        if (name.length >= 8 && name.includes(" ") && phone.length === 15 && password.length >= 8 && password === repeatPassword) {
            const body = {
                user_name: name,
                email,
                phone: phone.replace(/\D/g, ""),
                password
            }

            axios.post(`${baseUrl}users/signup`, body)
            .then(() => {
                alert("Usuário criado com sucesso!")
                Router.push("/login")
            })
            .catch(error => {
                setIsLoading(false)
                setAxiosError(error.response.data)
            })
        } else {
            setIsLoading(false)
            return
        }
    }

    return (
        <>
            <Head>
                <title>Signup | ChatAI</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="O melhor chat de inteligência artificial"/>
                <meta name="keywords" content="chat, inteligência artificial, openai, chatgpt"/>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <main className={styles.container}>
                <Header/>
                <h2>Crie uma nova conta</h2>

                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name">Nome completo</label>
                        <input 
                            className={`${nameError && styles.error}`}
                            type={'text'} 
                            placeholder="Maria Santos" 
                            name="name" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                        <p>{nameError}</p>
                    </div>
                    
                    <div>
                        <label htmlFor="phone">Telefone</label>
                        <input
                            className={`${phoneError && styles.error}`}
                            type="text"
                            placeholder="(99) 99999-9999"
                            name="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        <p>{phoneError}</p>
                    </div>

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
                                type={inputTypePass} 
                                placeholder="********" 
                                name="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                            />
                            {
                                inputTypePass === "password"? <AiOutlineEyeInvisible onClick={() => setInputTypePass("text")}/> : 
                                <AiOutlineEye onClick={() => setInputTypePass("password")}/>
                            }
                        </span>
                        <p>{passwordError}</p>
                    </div>

                    <div>
                        <label htmlFor="repeatPassword">Repita a senha</label>
                        <span className={styles.password}>
                            <input 
                                className={`${repeatPasswordError && styles.error}`}
                                type={inputTypeRepeatPass} 
                                placeholder="********" 
                                name="repeatPassword" 
                                value={repeatPassword} 
                                onChange={e => setRepeatPassword(e.target.value)}
                            />
                            {
                                inputTypeRepeatPass === "password"? <AiOutlineEyeInvisible onClick={() => setInputTypeRepeatPass("text")}/> : 
                                <AiOutlineEye onClick={() => setInputTypeRepeatPass("password")}/>
                            }
                        </span>
                        <p>{repeatPasswordError}</p>
                    </div>

                    <p>{axiosError}</p>

                    <button disabled={isButtonDisabled}>{isLoading? <Loading/> : 'Cadastrar'}</button>
                </form>

                <Link href="/" className={styles.icon}>
                    <BsFillArrowLeftCircleFill/>
                </Link>
            </main>
        </>
    )
}