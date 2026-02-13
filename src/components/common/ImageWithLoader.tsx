import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'

type ImageWithLoaderProps = ImgHTMLAttributes<HTMLImageElement> & {
  containerClassName?: string
  loaderClassName?: string
  fallback?: ReactNode
  spinnerDelayMs?: number
  minimumLoadingMs?: number
}

const ImageWithLoader = ({
  containerClassName = '',
  loaderClassName = '',
  fallback,
  spinnerDelayMs = 450,
  minimumLoadingMs = 0,
  src,
  alt = '',
  className = '',
  onLoad,
  onError,
  ...props
}: ImageWithLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showSpinner, setShowSpinner] = useState(spinnerDelayMs <= 0)
  const spinnerDelayTimeoutRef = useRef<number | null>(null)
  const minimumLoadingTimeoutRef = useRef<number | null>(null)
  const loadStartMsRef = useRef<number>(performance.now())

  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
    setShowSpinner(spinnerDelayMs <= 0)
    loadStartMsRef.current = performance.now()

    if (src && spinnerDelayMs > 0) {
      spinnerDelayTimeoutRef.current = window.setTimeout(() => {
        setShowSpinner(true)
      }, spinnerDelayMs)
    }

    return () => {
      if (spinnerDelayTimeoutRef.current) {
        window.clearTimeout(spinnerDelayTimeoutRef.current)
        spinnerDelayTimeoutRef.current = null
      }
      if (minimumLoadingTimeoutRef.current) {
        window.clearTimeout(minimumLoadingTimeoutRef.current)
        minimumLoadingTimeoutRef.current = null
      }
    }
  }, [spinnerDelayMs, src])

  const showImage = Boolean(src) && !hasError
  const showFallback = !src || hasError

  return (
    <div className={`relative ${containerClassName}`}>
      {showImage && (
        <img
          {...props}
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          decoding="async"
          onLoad={(event) => {
            if (spinnerDelayTimeoutRef.current) {
              window.clearTimeout(spinnerDelayTimeoutRef.current)
              spinnerDelayTimeoutRef.current = null
            }

            const elapsedMs = performance.now() - loadStartMsRef.current
            const remainingMs = Math.max(minimumLoadingMs - elapsedMs, 0)

            if (remainingMs > 0) {
              minimumLoadingTimeoutRef.current = window.setTimeout(() => {
                setIsLoaded(true)
                minimumLoadingTimeoutRef.current = null
              }, remainingMs)
            } else {
              setIsLoaded(true)
            }

            onLoad?.(event)
          }}
          onError={(event) => {
            if (spinnerDelayTimeoutRef.current) {
              window.clearTimeout(spinnerDelayTimeoutRef.current)
              spinnerDelayTimeoutRef.current = null
            }
            if (minimumLoadingTimeoutRef.current) {
              window.clearTimeout(minimumLoadingTimeoutRef.current)
              minimumLoadingTimeoutRef.current = null
            }
            setHasError(true)
            onError?.(event)
          }}
        />
      )}
      {showImage && (
        <div
          className={`absolute inset-0 z-10 overflow-hidden rounded-[inherit] bg-slate-950/28 transition-opacity duration-300 dark:bg-slate-900/60 ${isLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'} ${loaderClassName}`}
          aria-hidden="true"
        >
          <span className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/60 via-transparent to-white/20 dark:from-slate-100/5 dark:via-transparent dark:to-slate-100/10" />
          {showSpinner && !isLoaded && (
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/45 shadow-lg backdrop-blur-[1px] dark:bg-slate-950/55">
              <LoadingSpinner />
            </span>
          )}
        </div>
      )}
      {showFallback && fallback && <div className="absolute inset-0">{fallback}</div>}
    </div>
  )
}

export default ImageWithLoader
