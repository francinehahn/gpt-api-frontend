import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import logo from "../assets/chatAI-logo.png"
import styles from "../styles/Home.module.scss"


export default function Home() {
  const [radioForm, setRadioForm] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(radioForm)
  }

  return (
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>

          <aside>
            <h2>Selecione uma das opções abaixo:</h2>
            <form onSubmit={handleSubmit}>
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

              <button>Enviar</button>
            </form>
          </aside>

          <section>
            {!radioForm && <Image src={logo} alt="Logo do chatAI"/>}

            {radioForm && <p>Chat</p>}
          </section>

        </div>
      </main>
    </>
  )
}
