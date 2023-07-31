import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Router from 'next/router'

import nookies, { destroyCookie } from "nookies"
import { TbLogout2 } from "react-icons/tb"

import logo from "../../assets/chatAI-logo.png"
import { AiOutlineSend } from "react-icons/ai"
import styles from "./styles.module.scss"
import { Animation } from '@/components/animation/Animation'
import { GetServerSidePropsContext } from 'next'



export default function Home() {
    const [radioForm, setRadioForm] = useState("")
    const [textValue, setTextValue] = useState("")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [showAnimation, setShowAnimation] = useState(false)

    const handleLogout = () => {
        destroyCookie(null, "token")
        Router.push("/")
    }

    const handleRadioInputChange = (e: any) => {
        setRadioForm(e.target.value)
        
        if (e.target.value === "writer") {
            setTitle("Assistente de escrita")
            setDescription("Informe o que você quer que o chatAI escreva para você")
        } else if (e.target.value === "recipe") {
            setTitle("Criador de receitas")
            setDescription("Informe os ingredientes que você tem em casa e o chatAI irá criar uma receita para você")
        } else if (e.target.value === "summary") {
            setTitle("Criador de resumos")
            setDescription("Informe o seu texto e o chatAI fará um resumo para você")
        } else if (e.target.value === "translator") {
            setTitle("Tradutor")
            setDescription("Informe as línguas de origem e de destino e o seu texto e o chatAI fará a tradução para você")
        }

        setShowAnimation(true)

        setTimeout(() => {
        setShowAnimation(false)
        }, 4000)
    }

    const handleTextChange = (e: any) => {
        setTextValue(e.target.value)
        adjustTextAreaHeight()
    }

    const adjustTextAreaHeight = () => {
        const textarea = document.getElementById("textArea")
        if (textarea) {
            textarea.style.height = "auto"
            const newHeight = textarea.scrollHeight
            textarea.style.height = newHeight + "px"
        }
    }

    return (
        <>
        <Head>
            <title>ChatAI</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="O melhor chat de inteligência artificial"/>
            <meta name="keywords" content="chat, inteligência artificial, openai, chatgpt"/>
            <link rel="icon" href="/favicon.png" />
        </Head>

        <main className={styles.main}>
            <div className={styles.container}>

            <aside>
                <TbLogout2 onClick={handleLogout}/>
                <h2>Selecione uma das opções abaixo:</h2>
                <form>
                    <span>
                        <input type="radio" name="option" id="writer" value="writer" onChange={handleRadioInputChange}/>
                        <label htmlFor="writer">Escritor</label>
                    </span>
                    <span>
                        <input type="radio" name="option" id="recipe" value="recipe" onChange={handleRadioInputChange}/>
                        <label htmlFor="recipe">Receitas</label>
                    </span>
                    <span>
                        <input type="radio" name="option" id="summary" value="summary" onChange={handleRadioInputChange}/>
                        <label htmlFor="summary">Resumos</label>
                    </span>
                    <span>
                        <input type="radio" name="option" id="translator" value="translator" onChange={handleRadioInputChange}/>
                        <label htmlFor="translator">Tradutor</label>
                    </span>
                    {
                        radioForm === "translator" && (
                        <div className={styles.languages}>
                            <input type="text" placeholder="Língua de origem"/>
                            <input type="text" placeholder="Língua de destino"/>
                        </div>
                        )
                    }
                </form>
            </aside>

            <section>
                {!radioForm && <Image src={logo} alt="Logo do chatAI" priority/>}
                {showAnimation && <Animation title={title} description={description}/>}

                {radioForm && !showAnimation && (
                <>
                <div className={styles.chatAnswer}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid in itaque, recusandae nesciunt porro esse cum quaerat pariatur est ut libero id excepturi totam mollitia ab nisi laudantium error necessitatibus!</p>
                </div>

                <div className={styles.chatInput}>
                    <form>
                    <textarea 
                        id="textArea"
                        className={styles["resizable-textarea"]}
                        rows={1}
                        placeholder="Digite aqui" 
                        value={textValue} 
                        onChange={e => handleTextChange(e)}
                    />
                    <button disabled={textValue.trim() === ""}>
                        <AiOutlineSend/>
                    </button>
                    </form>
                </div>
                </>
                )}
            </section>
            
            </div>
        </main>
        </>
    )
}

export async function getServerSideProps (ctx: GetServerSidePropsContext) {
    const cookies = nookies.get(ctx);

    if (!cookies.token) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}