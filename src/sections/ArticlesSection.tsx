import SectionHeader from '../components/common/SectionHeader'
import Pill from '../components/common/Pill'
import type { ProfileContent } from '../data/types'
import type { UiCopy } from '../i18n'
import { getTechIcon } from '../icons/techIcons'

type ArticlesSectionProps = {
  articles: ProfileContent['articles']
  copy: UiCopy['sections']['articles']
}

const ArticlesSection = ({ articles, copy }: ArticlesSectionProps) => {
  if (!articles?.length) {
    return null
  }

  return (
    <section id="articulos" className="space-y-6">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <article
            key={article.title}
            className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-slate-800 dark:bg-surface"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">{article.title}</h3>
              <Pill label={copy.upcomingLabel} variant="primary" />
            </div>
            <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300">{article.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {article.tags?.map((tag) => (
                <Pill key={tag} label={tag} icon={getTechIcon(tag)} />
              ))}
            </div>
            {article.url && article.url !== '#' && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center text-xs font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                {copy.readMoreLabel}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ArticlesSection
