'use client'

import saveAs from 'file-saver'
import { useParams } from 'next/navigation'
import { RefObject, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'

import { NINE_ITEMS } from '@/constants/question'
import { allAnswersSelector } from '@/states/answer'
import { allUsersSelector } from '@/states/user'
import { Answer } from '@/types/answer'

export default function StyleCanvas() {
  const { ticker } = useParams()
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null)
  const answers = useRecoilValue(allAnswersSelector)
  const users = useRecoilValue(allUsersSelector)

  useEffect(() => {
    if (!canvasRef?.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const drawStyle = () => {
      users.forEach((user, userIndex) => {
        if (user.image === null || user.username === null) return false
        const userImage = new Image()
        userImage.src = `${user.image}`

        const x = 100
        const y = 100 + (100 + 30) * userIndex + 45
        const radius = 45

        ctx.save()
        // 현재 컨텍스트 설정 저장

        // 클리핑 영역을 원으로 설정
        ctx.beginPath()
        ctx.arc(x, y + 20, radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()

        // 원 안에 이미지 그리기
        const imageSize = Math.min(userImage.width, userImage.height) // 이미지의 크기 중에서 작은 값을 기준으로 정사각형 크기 설정
        const sourceX = (userImage.width - imageSize) / 2 // 이미지의 중앙에서 크롭할 위치 계산
        const sourceY = (userImage.height - imageSize) / 2
        const sourceSize = imageSize

        ctx.drawImage(
          userImage,
          sourceX,
          sourceY,
          sourceSize,
          sourceSize,
          x - radius,
          y + 20 - radius,
          radius * 2,
          radius * 2,
        )

        ctx.restore() // 이전 컨텍스트 설정으로 복원

        // 텍스트 그리기
        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'
        ctx.font = '800 24px SUITE Variable' // Adjust the font size here
        ctx.fillText(`${user?.username}`, x, y + 95) // Adjust the y position here

        const userAnswers = answers.filter((answer) =>
          answer.id.includes(`multi-u${userIndex}`),
        )

        const answerTextY = y - radius
        const answerTextX = x + radius + 160

        // 이미지 너비와 높이 설정
        const imageWidth = 120 // 이미지 너비
        const imageHeight = 120 // 이미지 높이

        // 이미지 간격 설정
        const imageSpacingY = 0 // Y축 간격

        userAnswers.forEach((answer: Answer, answerIndex) => {
          if (answer.artistMember === null) return false
          const textX = answerTextX + answerIndex * imageWidth
          const textY = answerTextY

          if (userIndex === 0) {
            ctx.font = '900 36px SUITE Variable'
            ctx.fillText(NINE_ITEMS[answerIndex], textX, textY)
          }

          const imageX = textX - 60
          const imageY = answerTextY + imageSpacingY + 20

          const memberImage = new Image()
          memberImage.crossOrigin = 'anonymous'
          memberImage.src = `${answer.artistMember.profileImage}`

          memberImage.onload = () => {
            ctx.drawImage(memberImage, imageX, imageY, imageWidth, imageHeight)
          }
          return true
        })
        return true
      })
    }

    drawStyle()

    ctx.fillStyle = 'black'
    ctx.textAlign = 'right'
    ctx.font = '400 22px sans-serif'
    ctx.fillText(
      `@DevvTyga 개발자 타이가 - ${ticker || 'K-POP'} 취향표`,
      canvas.width - 10,
      canvas.height - 10,
    )
  }, [canvasRef, users, answers])

  const saveAsImage = () => {
    if (canvasRef?.current) {
      const scale = 3 // 이미지 저장 시 크기를 3배로 확장
      const canvas = document.createElement('canvas')
      canvas.width = canvasRef.current.width * scale
      canvas.height = canvasRef.current.height * scale
      const context = canvas.getContext('2d')

      if (context) {
        context.scale(scale, scale)
        context.drawImage(canvasRef.current, 0, 0)

        canvas.toBlob((blob) => {
          saveAs(blob as Blob, `${ticker}-style.png`)
        })
      }
    }
  }

  return (
    <div className="bg-white w-full">
      <canvas
        ref={canvasRef}
        width={1400}
        height={1000}
        className="w-full bg-white"
      />
      <button
        onClick={saveAsImage}
        className={`fixed rounded-[28px] left-1/2 -translate-x-1/2 text-center items-center justify-center py-[16px] bg-gray-900 text-white font-bold text-[13px] w-[85%] bottom-[35px] ${'block'}`}
      >
        저장하기
      </button>
    </div>
  )
}
