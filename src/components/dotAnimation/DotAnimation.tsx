import React from "react"
import styles from "./styles.module.scss"

export function DotAnimation() {
    return (
        <div className={styles.container}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
        </div>
    )
}