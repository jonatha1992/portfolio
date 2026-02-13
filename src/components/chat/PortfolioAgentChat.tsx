import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import type { Locale, ProfileContent } from '../../data/types'
import type { UiCopy } from '../../i18n'
import {
  askPortfolioAgent,
  isPortfolioAgentConfigured,
  type AgentChatMessage,
} from '../../services/portfolioAgent'

type PortfolioAgentChatProps = {
  locale: Locale
  content: ProfileContent
  copy: UiCopy['chatAgent']
}

type ChatMessage = {
  id: string
  role: AgentChatMessage['role']
  content: string
  seed?: boolean
}

const INLINE_TOKEN_REGEX =
  /\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*|(?:https?:\/\/[^\s<>()]+|www\.[^\s<>()]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|\+?\d[\d\s().-]{6,}\d)/g
const BULLET_LINE_REGEX = /^[-*]\s+(.*)$/
const HEADING_LINE_REGEX = /^#{1,6}\s*(.+)$/

function stripTrailingPunctuation(value: string): { clean: string; trailing: string } {
  const match = value.match(/[.,!?;:]+$/)

  if (!match) {
    return { clean: value, trailing: '' }
  }

  return {
    clean: value.slice(0, -match[0].length),
    trailing: match[0],
  }
}

function isHttpLink(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

function isLikelyPhoneToken(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 8 && (value.includes('+') || /[\s().-]/.test(value))
}

function toTelHref(phoneToken: string): string {
  const digits = phoneToken.replace(/\D/g, '')

  if (!digits.length) {
    return ''
  }

  return phoneToken.trim().startsWith('+') ? `tel:+${digits}` : `tel:${digits}`
}

function normalizeHref(rawHref: string): string | null {
  const href = rawHref.trim()

  if (!href.length) {
    return null
  }

  if (
    /^https?:\/\//i.test(href) ||
    /^mailto:/i.test(href) ||
    /^tel:/i.test(href) ||
    href.startsWith('#')
  ) {
    return href
  }

  if (/^www\./i.test(href)) {
    return `https://${href}`
  }

  return null
}

function getHrefFromToken(token: string): string | null {
  if (/^https?:\/\//i.test(token)) {
    return token
  }

  if (/^www\./i.test(token)) {
    return `https://${token}`
  }

  if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(token)) {
    return `mailto:${token}`
  }

  if (isLikelyPhoneToken(token)) {
    return toTelHref(token)
  }

  return null
}

function getLinkClassName(isUser: boolean): string {
  return isUser
    ? 'font-semibold underline decoration-white/80 underline-offset-2'
    : 'font-semibold underline underline-offset-2 text-primary-dark dark:text-primary-light'
}

function renderInlineContent(content: string, isUser: boolean, keyPrefix: string): ReactNode[] {
  const linkClassName = getLinkClassName(isUser)
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  INLINE_TOKEN_REGEX.lastIndex = 0

  while ((match = INLINE_TOKEN_REGEX.exec(content)) !== null) {
    const fullMatch = match[0]
    const start = match.index

    if (start > lastIndex) {
      nodes.push(content.slice(lastIndex, start))
    }

    const markdownLabel = match[1]
    const markdownHrefRaw = match[2]
    const boldText = match[3]

    if (markdownLabel && markdownHrefRaw) {
      const href = normalizeHref(markdownHrefRaw)

      if (href) {
        nodes.push(
          <a
            key={`${keyPrefix}-md-${start}`}
            href={href}
            target={isHttpLink(href) ? '_blank' : undefined}
            rel={isHttpLink(href) ? 'noreferrer' : undefined}
            className={linkClassName}
          >
            {markdownLabel}
          </a>,
        )
      } else {
        nodes.push(fullMatch)
      }
    } else if (boldText) {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${start}`} className="font-semibold">
          {boldText}
        </strong>,
      )
    } else {
      const { clean, trailing } = stripTrailingPunctuation(fullMatch)
      const href = getHrefFromToken(clean)

      if (href) {
        nodes.push(
          <a
            key={`${keyPrefix}-auto-${start}`}
            href={href}
            target={isHttpLink(href) ? '_blank' : undefined}
            rel={isHttpLink(href) ? 'noreferrer' : undefined}
            className={linkClassName}
          >
            {clean}
          </a>,
        )
      } else {
        nodes.push(fullMatch)
      }

      if (trailing) {
        nodes.push(trailing)
      }
    }

    lastIndex = start + fullMatch.length
  }

  if (lastIndex < content.length) {
    nodes.push(content.slice(lastIndex))
  }

  return nodes.length ? nodes : [content]
}

function renderChatMessageContent(content: string, isUser: boolean): ReactNode {
  const linkClassName = isUser
    ? 'marker:text-white/80'
    : 'marker:text-primary-dark dark:marker:text-primary-light'
  const lines = content.split('\n')
  const blocks: ReactNode[] = []
  const pendingListItems: string[] = []

  const flushList = (key: string) => {
    if (!pendingListItems.length) {
      return
    }

    blocks.push(
      <ul key={`list-${key}`} className={`list-disc space-y-1 pl-5 ${linkClassName}`}>
        {pendingListItems.map((item, index) => (
          <li key={`list-${key}-item-${index}`}>{renderInlineContent(item, isUser, `li-${key}-${index}`)}</li>
        ))}
      </ul>,
    )

    pendingListItems.length = 0
  }

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex]
    const trimmedLine = line.trim()

    const bulletMatch = trimmedLine.match(BULLET_LINE_REGEX)

    if (bulletMatch) {
      pendingListItems.push(bulletMatch[1])
      continue
    }

    flushList(String(lineIndex))

    if (!trimmedLine.length) {
      blocks.push(<div key={`space-${lineIndex}`} className="h-1" />)
      continue
    }

    const headingMatch = trimmedLine.match(HEADING_LINE_REGEX)

    if (headingMatch) {
      blocks.push(
        <p key={`heading-${lineIndex}`} className="font-semibold tracking-tight">
          {renderInlineContent(headingMatch[1], isUser, `heading-${lineIndex}`)}
        </p>,
      )
      continue
    }

    blocks.push(
      <p key={`paragraph-${lineIndex}`} className="leading-relaxed">
        {renderInlineContent(trimmedLine, isUser, `paragraph-${lineIndex}`)}
      </p>,
    )
  }

  flushList('final')

  return <div className="space-y-2">{blocks.length ? blocks : renderInlineContent(content, isUser, 'single')}</div>
}

function getMessageId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getSeedMessage(introMessage: string): ChatMessage {
  return {
    id: 'seed-intro',
    role: 'assistant',
    content: introMessage,
    seed: true,
  }
}

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: getMessageId(),
    role,
    content,
  }
}

const PortfolioAgentChat = ({ locale, content, copy }: PortfolioAgentChatProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [getSeedMessage(copy.introMessage)])

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null)
  const isConfigured = useMemo(() => isPortfolioAgentConfigured(), [])

  useEffect(() => {
    setMessages([getSeedMessage(copy.introMessage)])
    setInputValue('')
  }, [copy.introMessage])

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, isLoading, isOpen])

  const historyForAgent = useMemo<AgentChatMessage[]>(
    () =>
      messages
        .filter((message) => !message.seed)
        .map((message) => ({
          role: message.role,
          content: message.content,
        })),
    [messages],
  )

  const hasUserMessages = messages.some((message) => message.role === 'user')

  const sendMessage = async (rawMessage: string) => {
    const text = rawMessage.trim()

    if (!text || isLoading) {
      return
    }

    setMessages((prev) => [...prev, createMessage('user', text)])
    setInputValue('')

    if (!isConfigured) {
      setMessages((prev) => [...prev, createMessage('assistant', copy.missingKeyMessage)])
      return
    }

    setIsLoading(true)

    try {
      const assistantReply = await askPortfolioAgent({
        locale,
        content,
        userMessage: text,
        history: historyForAgent,
      })

      setMessages((prev) => [...prev, createMessage('assistant', assistantReply)])
    } catch (error) {
      console.error('Portfolio assistant error:', error)
      setMessages((prev) => [...prev, createMessage('assistant', copy.errorMessage)])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendMessage(inputValue)
  }

  const handleQuickPrompt = (prompt: string) => {
    void sendMessage(prompt)
  }

  const resetChat = () => {
    setMessages([getSeedMessage(copy.introMessage)])
    setInputValue('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-h-[90vh] w-[min(95vw,390px)] flex-col items-end gap-2.5">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={copy.openLabel}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-primary/35 transition hover:bg-primary-light"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <span>{copy.openLabel}</span>
        </button>
      )}

      {isOpen && (
        <section className="flex h-[min(74vh,600px)] w-full flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-surface">
          <header className="flex items-start justify-between gap-3 border-b border-neutral-300 bg-gradient-to-r from-primary/10 via-white to-accent/15 px-3 py-2.5 dark:border-slate-700 dark:from-primary/20 dark:via-surface dark:to-primary/10">
            <div className="min-w-0 space-y-1">
              <p className="flex items-center gap-2 font-display text-sm font-semibold text-slate-900 dark:text-white">
                <SparklesIcon className="h-4 w-4 text-primary-dark dark:text-primary-light" />
                {copy.title}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">{copy.subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                aria-label={copy.clearLabel}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/80 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={copy.closeLabel}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/80 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
              {!hasUserMessages && (
                <div className="flex flex-wrap gap-2">
                  {copy.quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary-dark transition hover:border-primary-light hover:bg-primary/10 dark:border-primary/40 dark:text-primary-light"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-3 py-2 text-sm ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-primary text-white'
                        : 'rounded-bl-md border border-neutral-300 bg-neutral-50 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {renderChatMessageContent(message.content, message.role === 'user')}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <p className="max-w-[86%] rounded-2xl rounded-bl-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {copy.loadingLabel}
                  </p>
                </div>
              )}

              <div ref={endOfMessagesRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-neutral-300 bg-white p-2.5 dark:border-slate-700 dark:bg-surface"
            >
              <div className="flex items-center gap-2">
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder={copy.placeholder}
                  className="h-10 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-primary-light dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={copy.sendLabel}
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}

export default PortfolioAgentChat
