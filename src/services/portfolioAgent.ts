import type { Locale, ProfileContent } from '../data/types'

export type AgentChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type PortfolioAgentRequest = {
  locale: Locale
  content: ProfileContent
  userMessage: string
  history: AgentChatMessage[]
}

type AiProvider = 'openai' | 'gemini' | 'openrouter' | 'groq'

type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

type OpenAIChatChoice = {
  message?: {
    content?: string | Array<{ type?: string; text?: string }>
  }
}

type OpenAIChatResponse = {
  choices?: OpenAIChatChoice[]
  error?: {
    message?: string
  }
}

type GeminiChatResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>
    }
  }>
  error?: {
    message?: string
  }
}

type ProviderRequestConfig = {
  provider: AiProvider
  apiKey: string
  model: string
  apiUrl: string
}

type ProviderRequestPayload = {
  locale: Locale
  content: ProfileContent
  userMessage: string
  history: AgentChatMessage[]
}

const DEFAULT_PROVIDER: AiProvider = 'gemini'
const DEFAULT_OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini'
const DEFAULT_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta'
const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash'
const DEFAULT_OPEN_ROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_OPEN_ROUTER_MODEL = 'openai/gpt-4o-mini'
const DEFAULT_GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_GROQ_MODEL = 'llama-3.1-8b-instant'
const MAX_HISTORY_MESSAGES = 10
const PROVIDER_FALLBACK_ORDER: AiProvider[] = ['gemini', 'openrouter', 'groq', 'openai']

function getEnvValue(name: string): string | undefined {
  const value = (import.meta.env as Record<string, string | undefined>)[name]

  if (!value) {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

function getProvider(): AiProvider {
  const provider = (getEnvValue('VITE_AI_PROVIDER') ?? DEFAULT_PROVIDER).toLowerCase()

  if (provider === 'openai' || provider === 'gemini' || provider === 'openrouter' || provider === 'groq') {
    return provider
  }

  return DEFAULT_PROVIDER
}

function getProviderOrder(preferredProvider: AiProvider): AiProvider[] {
  const order: AiProvider[] = [preferredProvider]

  for (const provider of PROVIDER_FALLBACK_ORDER) {
    if (!order.includes(provider)) {
      order.push(provider)
    }
  }

  return order
}

function getProviderApiKey(provider: AiProvider, preferredProvider: AiProvider): string | undefined {
  const legacyApiKey = getEnvValue('VITE_AI_API_KEY')

  switch (provider) {
    case 'gemini':
      return (
        getEnvValue('GEMINI_API_KEY') ??
        getEnvValue('VITE_GEMINI_API_KEY') ??
        (preferredProvider === 'gemini' ? legacyApiKey : undefined)
      )
    case 'openrouter':
      return (
        getEnvValue('OPEN_ROUTER_API_KEY') ??
        getEnvValue('VITE_OPEN_ROUTER_API_KEY') ??
        (preferredProvider === 'openrouter' ? legacyApiKey : undefined)
      )
    case 'groq':
      return (
        getEnvValue('GROQ_API_KEY') ??
        getEnvValue('VITE_GROQ_API_KEY') ??
        (preferredProvider === 'groq' ? legacyApiKey : undefined)
      )
    case 'openai':
      return (
        getEnvValue('OPENAI_API_KEY') ??
        getEnvValue('VITE_OPENAI_API_KEY') ??
        (preferredProvider === 'openai' ? legacyApiKey : undefined)
      )
    default:
      return undefined
  }
}

export function isPortfolioAgentConfigured(): boolean {
  const preferredProvider = getProvider()

  return getProviderOrder(preferredProvider).some((provider) => Boolean(getProviderApiKey(provider, preferredProvider)))
}

function getModel(provider: AiProvider): string {
  const sharedModel = getEnvValue('VITE_AI_MODEL')

  switch (provider) {
    case 'gemini':
      return getEnvValue('VITE_GEMINI_MODEL') ?? sharedModel ?? DEFAULT_GEMINI_MODEL
    case 'openrouter':
      return getEnvValue('VITE_OPEN_ROUTER_MODEL') ?? sharedModel ?? DEFAULT_OPEN_ROUTER_MODEL
    case 'groq':
      return getEnvValue('VITE_GROQ_MODEL') ?? sharedModel ?? DEFAULT_GROQ_MODEL
    case 'openai':
      return getEnvValue('VITE_OPENAI_MODEL') ?? sharedModel ?? DEFAULT_OPENAI_MODEL
    default:
      return sharedModel ?? DEFAULT_GEMINI_MODEL
  }
}

function buildPortfolioSnapshot(content: ProfileContent): string {
  const snapshot = {
    personal: content.personal,
    skills: content.skills,
    projects: content.projects.map((project) => ({
      title: project.title,
      role: project.role,
      period: project.period,
      summary: project.summary,
      highlights: project.highlights,
      stack: project.stack,
      codeUrl: project.codeUrl,
      liveUrl: project.liveUrl,
      status: project.status,
    })),
    achievements: content.achievements,
    experience: content.experience,
    education: content.education,
    certifications: content.certifications,
    timeline: content.timeline,
    articles: content.articles,
    contact: content.contact,
    socials: content.socials,
  }

  return JSON.stringify(snapshot)
}

function buildSystemPrompt(locale: Locale, content: ProfileContent): string {
  const languageRule = locale === 'es' ? 'Responde siempre en espanol neutro.' : 'Always answer in clear English.'

  return [
    'You are the AI assistant for Jonathan Correa portfolio website.',
    languageRule,
    'Only use verified details from the provided portfolio snapshot.',
    'If the user asks for data that is not in the snapshot, say it is unavailable and recommend direct contact.',
    'When sharing contact details, format them as Markdown links: [LinkedIn](https://...), [Email](mailto:...), [Telefono](tel:+...).',
    'Guide visitors to section anchors when useful: #inicio, #habilidades, #proyectos, #logros, #experiencia, #formacion, #timeline, #articulos, #contacto.',
    'Keep answers concise and actionable.',
    `Portfolio snapshot JSON: ${buildPortfolioSnapshot(content)}`,
  ].join('\n')
}

function extractAssistantMessage(data: OpenAIChatResponse): string | null {
  const content = data.choices?.[0]?.message?.content

  if (typeof content === 'string' && content.trim().length) {
    return content.trim()
  }

  if (Array.isArray(content)) {
    const text = content
      .filter((chunk) => chunk.type === 'text' && typeof chunk.text === 'string')
      .map((chunk) => chunk.text?.trim())
      .filter((chunk): chunk is string => Boolean(chunk?.length))
      .join('\n')

    return text.length ? text : null
  }

  return null
}

function extractGeminiMessage(data: GeminiChatResponse): string | null {
  const parts = data.candidates?.[0]?.content?.parts

  if (!Array.isArray(parts)) {
    return null
  }

  const text = parts
    .map((part) => part.text?.trim())
    .filter((part): part is string => Boolean(part?.length))
    .join('\n')

  return text.length ? text : null
}

function buildGeminiApiUrl(model: string, apiKey: string, configuredUrl?: string): string {
  const baseUrl = configuredUrl ?? `${DEFAULT_GEMINI_API_URL}/models/${model}:generateContent`
  const url = new URL(baseUrl)

  if (!url.searchParams.has('key')) {
    url.searchParams.set('key', apiKey)
  }

  return url.toString()
}

function getOpenAICompatibleApiUrl(provider: AiProvider): string {
  if (provider === 'openrouter') {
    return getEnvValue('VITE_OPEN_ROUTER_API_URL') ?? getEnvValue('VITE_AI_API_URL') ?? DEFAULT_OPEN_ROUTER_API_URL
  }

  if (provider === 'groq') {
    return getEnvValue('VITE_GROQ_API_URL') ?? getEnvValue('VITE_AI_API_URL') ?? DEFAULT_GROQ_API_URL
  }

  return getEnvValue('VITE_OPENAI_API_URL') ?? getEnvValue('VITE_AI_API_URL') ?? DEFAULT_OPENAI_API_URL
}

function getProviderRequestConfigs(preferredProvider: AiProvider): ProviderRequestConfig[] {
  return getProviderOrder(preferredProvider)
    .map((provider) => {
      const apiKey = getProviderApiKey(provider, preferredProvider)

      if (!apiKey) {
        return null
      }

      const model = getModel(provider)
      const apiUrl =
        provider === 'gemini'
          ? buildGeminiApiUrl(
              model,
              apiKey,
              getEnvValue('VITE_GEMINI_API_URL') ?? getEnvValue('VITE_AI_API_URL'),
            )
          : getOpenAICompatibleApiUrl(provider)

      return {
        provider,
        apiKey,
        model,
        apiUrl,
      }
    })
    .filter((config): config is ProviderRequestConfig => Boolean(config))
}

function getOpenRouterHeaders(): Record<string, string> {
  const headers: Record<string, string> = {}
  const referer = getEnvValue('VITE_OPEN_ROUTER_SITE_URL')
  const title = getEnvValue('VITE_OPEN_ROUTER_APP_NAME')

  if (referer) {
    headers['HTTP-Referer'] = referer
  }

  if (title) {
    headers['X-Title'] = title
  }

  return headers
}

async function requestWithOpenAICompatible(
  apiKey: string,
  apiUrl: string,
  model: string,
  locale: Locale,
  content: ProfileContent,
  userMessage: string,
  history: AgentChatMessage[],
  extraHeaders: Record<string, string> = {},
): Promise<string> {
  const messages: OpenAIMessage[] = [
    {
      role: 'system',
      content: buildSystemPrompt(locale, content),
    },
    ...history.slice(-MAX_HISTORY_MESSAGES).map((message) => ({
      role: message.role,
      content: message.content,
    })),
    {
      role: 'user',
      content: userMessage,
    },
  ]

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.35,
      max_tokens: 500,
    }),
  })

  const data = (await response.json()) as OpenAIChatResponse

  if (!response.ok) {
    throw new Error(data.error?.message ?? `AI request failed (${response.status})`)
  }

  const assistantMessage = extractAssistantMessage(data)

  if (!assistantMessage) {
    throw new Error('AI response came back empty')
  }

  return assistantMessage
}

async function requestWithGemini(
  apiUrl: string,
  locale: Locale,
  content: ProfileContent,
  userMessage: string,
  history: AgentChatMessage[],
): Promise<string> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildSystemPrompt(locale, content) }],
      },
      contents: [
        ...history.slice(-MAX_HISTORY_MESSAGES).map((message) => ({
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.content }],
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 500,
      },
    }),
  })

  const data = (await response.json()) as GeminiChatResponse

  if (!response.ok) {
    throw new Error(data.error?.message ?? `AI request failed (${response.status})`)
  }

  const assistantMessage = extractGeminiMessage(data)

  if (!assistantMessage) {
    throw new Error('AI response came back empty')
  }

  return assistantMessage
}

async function requestWithProvider(config: ProviderRequestConfig, payload: ProviderRequestPayload): Promise<string> {
  const { locale, content, userMessage, history } = payload

  if (config.provider === 'gemini') {
    return requestWithGemini(config.apiUrl, locale, content, userMessage, history)
  }

  const extraHeaders = config.provider === 'openrouter' ? getOpenRouterHeaders() : {}

  return requestWithOpenAICompatible(
    config.apiKey,
    config.apiUrl,
    config.model,
    locale,
    content,
    userMessage,
    history,
    extraHeaders,
  )
}

export async function askPortfolioAgent({
  locale,
  content,
  userMessage,
  history,
}: PortfolioAgentRequest): Promise<string> {
  const preferredProvider = getProvider()
  const providerConfigs = getProviderRequestConfigs(preferredProvider)

  if (!providerConfigs.length) {
    throw new Error(
      'Missing API key configuration. Add GEMINI_API_KEY, OPEN_ROUTER_API_KEY, GROQ_API_KEY, or VITE_AI_API_KEY.',
    )
  }

  let lastError: Error | undefined

  for (const config of providerConfigs) {
    try {
      return await requestWithProvider(config, {
        locale,
        content,
        userMessage,
        history,
      })
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('AI request failed')
      console.error(`Portfolio assistant provider "${config.provider}" failed:`, lastError.message)
    }
  }

  throw lastError ?? new Error('AI request failed')
}
