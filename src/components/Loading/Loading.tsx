import React from 'react'
import styles from "./styles.module.scss"

interface LoadingProps {
    button: boolean,
    color?: string
}

export function Loading (props: LoadingProps) {
    return (
        <>
            {props.button && props.color === "white" && <div className={`${styles.whiteButton} ${styles.button}`}></div>}
            {props.button && props.color === "grey" && <div className={`${styles.greyButton} ${styles.button}`}></div>}
            {!props.button && <div className={styles.container}></div>}
        </>
    )
}