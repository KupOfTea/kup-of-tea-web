// ;<Image
//   className="object-cover object-center rounded-md aspect-square mb-1"
//   src={
//     member.profileImage === '/empty.jpg'
//       ? member.profileImage
//       : getImageUrl(member?.profileImage)
//   }
//   alt=""
//   width={200}
//   height={200}
// />

import React from 'react'

interface Props {
  src: string
  className: string
  width: number
  height: number
  alt: string
}

// https://kir93.tistory.com/entry/NextJS-Image%ED%83%9C%EA%B7%B8%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8A%A4%EC%BC%88%EB%A0%88%ED%86%A4Skeleton%EC%B2%98%EB%A6%AC
const blurDataURL =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='

export default function SkeletonImage({
  src,
  className,
  width,
  height,
  alt,
}: Props) {
  return (
    <img
      crossOrigin="anonymous"
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}
