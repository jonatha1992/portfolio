type LoadingSpinnerProps = {
  className?: string
}

const LoadingSpinner = ({ className = '' }: LoadingSpinnerProps) => (
  <span
    className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-100 border-t-primary shadow-[0_0_0_1px_rgba(15,23,42,0.25)] dark:border-slate-100/90 dark:border-t-primary-light ${className}`}
    aria-hidden="true"
  />
)

export default LoadingSpinner
