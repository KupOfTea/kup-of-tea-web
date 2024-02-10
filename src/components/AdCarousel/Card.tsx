import Image from 'next/image'

interface Props {
  link: string
}

export default function Card({ link }: Props) {
  return (
    <Image
      className="w-full aspect-[40/15]"
      src={link}
      alt=""
      width={400}
      height={150}
    />
  )
}
