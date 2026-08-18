import { FilePenLine, FileText, FolderTree, Users } from 'lucide-react'
import type { WidgetServerProps } from 'payload'

import KPICard from '../ui/KPICard'
import styles from './OverviewWidget.module.css'

export default async function OverviewWidget({
  req,
}: WidgetServerProps) {
  const payload = req.payload

  const [articles, drafts, authors, categories] = await Promise.all([
    payload.count({
      collection: 'articles',
    }),

    payload.count({
      collection: 'articles',
      where: {
        _status: {
          equals: 'draft',
        },
      },
    }),

    payload.count({
      collection: 'authors',
    }),

    payload.count({
      collection: 'categories',
    }),
  ])

  return (
    <div className="card">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <h2>Overview</h2>
            <p>ExpatSaudi CMS Statistics</p>
          </div>
        </div>

        <div className={styles.grid}>
          <KPICard
            title="Articles"
            value={articles.totalDocs}
            subtitle="Published Articles"
            icon={<FileText size={24} />}
          />

          <KPICard
            title="Drafts"
            value={drafts.totalDocs}
            subtitle="Waiting for Review"
            icon={<FilePenLine size={24} />}
          />

          <KPICard
            title="Authors"
            value={authors.totalDocs}
            subtitle="Registered Authors"
            icon={<Users size={24} />}
          />

          <KPICard
            title="Categories"
            value={categories.totalDocs}
            subtitle="Content Categories"
            icon={<FolderTree size={24} />}
          />
        </div>
      </div>
    </div>
  )
}