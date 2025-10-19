import { NewspaperIcon } from '@heroicons/react/24/outline'
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
    <section id="articulos" className="space-y-8">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        icon={<NewspaperIcon className="h-6 w-6" />}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <article
            key={article.title}
            className="group rounded-3xl border border-neutral-300 bg-white p-6 shadow-soft transition hover:-translate-y-1.5 hover:border-primary-light hover:shadow-glow dark:border-slate-700 dark:bg-surface"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{article.title}</h3>
              <Pill label={copy.upcomingLabel} variant="primary" />
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{article.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags?.map((tag) => (
                <Pill key={tag} label={tag} icon={getTechIcon(tag)} />
              ))}
            </div>
            {article.url && article.url !== '#' && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary-dark"
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
