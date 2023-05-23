
import styles from './index.module.css'

type BadgeProps = {
    type: string[];
}

export const Badge = ({ type }: BadgeProps) => {
    return (
        <article className={styles.badge_container}>
            <span className={styles.badge_text}>
                {type}
            </span>
        </article>
    )

}