import React from 'react'
import styles from "./styles.module.scss"

interface LoadingProps {
    button: boolean
}

export function Loading (props: LoadingProps) {
    return <div className={props.button? styles.button : styles.container}></div>
}