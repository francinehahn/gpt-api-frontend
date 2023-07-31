import Image from "next/image"
import logo from "../../assets/chatAI-logo.png"
import styles from "./styles.module.scss"

export function Header() {
    return (
        <header className={styles.container}>
            <Image src={logo} alt="Logo do chatAI"></Image>
        </header>
    )
}