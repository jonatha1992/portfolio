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

type AiProvider = 'openai' | 'gemini'

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

const DEFAULT_PROVIDER: AiProvider = 'gemini'
const DEFAULT_OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini'
const DEFAULT_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta'
const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash'
const MAX_HISTORY_MESSAGES = 10

function getEnvValue(name: string): string | undefined {
  const value = (import.meta.env as Record<string, string | undefined>)[name]

  if (!value) {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

export function isPortfolioAgentConfigured(): boolean {
  return Boolean(getEnvValue('VITE_AI_API_KEY'))
}

function getProvider(): AiProvider {
  const provider = (getEnvValue('VITE_AI_PROVIDER') ?? DEFAULT_PROVIDER).toLowerCase()
  return provider === 'openai' ? 'openai' : 'gemini'
}

function getModel(provider: AiProvider): string {
  const configuredModel = getEnvValue('VITE_AI_MODEL')

  if (configuredModel) {
    return configuredModel
  }

  return provider === 'gemini' ? DEFAULT_GEMINI_MODEL : DEFAULT_OPENAI_MODEL
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
  const languageRule =
    locale === 'es' ? 'Responde siempre en espanol neutro.' : 'Always answer in clear English.'

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

function buildGeminiApiUrl(model: string, apiKey: string): string {
  const configuredUrl = getEnvValue('VITE_AI_API_URL')
  const baseUrl = configuredUrl ?? `${DEFAULT_GEMINI_API_URL}/models/${model}:generateContent`
  const url = new URL(baseUrl)

  if (!url.searchParams.has('key')) {
    url.searchParams.set('key', apiKey)
  }

  return url.toString()
}

async function requestWithOpenAI(
  apiKey: string,
  model: string,
  locale: Locale,
  content: ProfileContent,
  userMessage: string,
  history: AgentChatMessage[],
): Promise<string> {
  const apiUrl = getEnvValue('VITE_AI_API_URL') ?? DEFAULT_OPENAI_API_URL
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
  apiKey: string,
  model: string,
  locale: Locale,
  content: ProfileContent,
  userMessage: string,
  history: AgentChatMessage[],
): Promise<string> {
  const apiUrl = buildGeminiApiUrl(model, apiKey)
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

export async function askPortfolioAgent({
  locale,
  content,
  userMessage,
  history,
}: PortfolioAgentRequest): Promise<string> {
  const apiKey = getEnvValue('VITE_AI_API_KEY')

  if (!apiKey) {
    throw new Error('Missing VITE_AI_API_KEY')
  }

  const provider = getProvider()
  const model = getModel(provider)

  if (provider === 'openai') {
    return requestWithOpenAI(apiKey, model, locale, content, userMessage, history)
  }

  return requestWithGemini(apiKey, model, locale, content, userMessage, history)
}
