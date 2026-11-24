type SectionHeaderProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ id, title, description }: SectionHeaderProps) {
  return (
    <div id={id} className="section-heading" data-reveal>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
