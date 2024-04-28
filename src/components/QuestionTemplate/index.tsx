import classNames from 'classnames'

interface Props {
  title: string
  subTitle?: string
  children: React.ReactNode
}

export default function QuestionTemplate({ title, subTitle, children }: Props) {
  const titleStyle = classNames(
    'text-black text-opacity-80 text-sm font-bold capitalize leading-[18.20px]',
    subTitle ? 'mb-1' : 'mb-2.5',
  )
  const subTitleStyle =
    'text-black text-opacity-50 text-[11px] font-medium leading-[14.30px] mb-4'

  return (
    <div className="flex flex-col w-full items-start w-full">
      <span className={titleStyle}>{title}</span>
      {subTitle && <span className={subTitleStyle}>{subTitle}</span>}
      {children}
    </div>
  )
}
