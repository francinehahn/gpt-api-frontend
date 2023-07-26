import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import logo from "../assets/chatAI-logo.png"
import { AiOutlineSend } from "react-icons/ai"
import styles from "../styles/Home.module.scss"


export default function Home() {
  const [radioForm, setRadioForm] = useState("")
  const [textValue, setTextValue] = useState("")

  const handleChange = (e: any) => {
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
        <meta name="description" content="Chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>

          <aside>
            <h2>Selecione uma das opções abaixo:</h2>
            <form>
              <div>
                <input type="radio" name="option" id="writer" value="writer" onChange={e => setRadioForm(e.target.value)}/>
                <label htmlFor="writer">Escritor</label>
              </div>
              <div>
                <input type="radio" name="option" id="recipe" value="recipe" onChange={e => setRadioForm(e.target.value)}/>
                <label htmlFor="recipe">Receitas</label>
              </div>
              <div>
                <input type="radio" name="option" id="summary" value="summary" onChange={e => setRadioForm(e.target.value)}/>
                <label htmlFor="summary">Resumos</label>
              </div>
              <div>
                <input type="radio" name="option" id="translator" value="translator" onChange={e => setRadioForm(e.target.value)}/>
                <label htmlFor="translator">Tradutor</label>
              </div>
            </form>
          </aside>

          <section>
            {!radioForm && <Image src={logo} alt="Logo do chatAI" priority/>}

            {radioForm && (
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
                    onChange={e => handleChange(e)}
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
