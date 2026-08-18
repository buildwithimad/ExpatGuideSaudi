import type { ReactNode } from 'react'
import styles from './KPICard.module.css'

type KPICardProps = {
  title: string
  value: number
  subtitle?: string
  icon: ReactNode
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
}: KPICardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        {icon}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>

        <div className={styles.value}>
          {value}
        </div>

        {subtitle && (
          <div className={styles.subtitle}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}