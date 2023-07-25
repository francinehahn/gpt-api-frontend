import Head from 'next/head'
import styles from "../styles/Home.module.scss"

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>

        </div>
      </main>
    </>
  )
}
