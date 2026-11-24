import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>(content: unknown) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.05 })
    const registered = new WeakSet<Element>()
    const register = () => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        if (registered.has(element)) return
        registered.add(element)
        if (!preference.matches && element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add('reveal-pending')
          observer.observe(element)
        }
      })
    }
    const showAll = () => root.querySelectorAll('[data-reveal]').forEach((element) => element.classList.remove('reveal-pending'))
    register()
    const mutations = new MutationObserver(register)
    mutations.observe(root, { childList: true, subtree: true })
    preference.addEventListener('change', showAll)
    return () => {
      observer.disconnect()
      mutations.disconnect()
      preference.removeEventListener('change', showAll)
      showAll()
    }
  }, [content])

  return ref
}
