'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import uuid from 'react-uuid'

const FormPage = () => {
  const { register, handleSubmit } = useForm()

  const [members, setMembers] = useState([
    {
      name: '',
      profileImage: '',
    },
  ])

  const handleAddMember = () => {
    const newMember = {
      name: '',
      profileImage: '',
    }
    setMembers((v) => [...v, newMember])
  }

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full bg-white">
      <form
        className="flex flex-col space-y-3"
        onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
      >
        <div className="flex flex-col space-y-3">
          <label
            htmlFor="groupName"
            className="text-gray font-semibold text-xs"
          >
            K-POP 그룹(또는 솔로 아티스트) 이름 *
          </label>
          <input
            id="groupName"
            name="groupName"
            className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
			sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
            placeholder="이름을 작성해 주세요."
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label
            htmlFor="groupTicker"
            className="text-gray font-semibold text-xs"
          >
            K-POP 그룹(또는 솔로 아티스트) 영어 이름 or 약자 *
          </label>
          <input
            id="groupTicker"
            name="groupTicker"
            className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
			sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
            placeholder="이름을 작성해 주세요."
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label
            htmlFor="fileAttachment"
            className="text-gray font-semibold text-xs"
          >
            K-POP 그룹(또는 솔로 아티스트) 로고 이미지 *
          </label>
          <div className="border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
            <input
              type="file"
              id="fileAttachment"
              className="w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              placeholder="이미지"
              {...register('fileAttachment')}
            />
            <div className="flex flex-row items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <label
            htmlFor="groupGender"
            className="text-gray font-semibold text-xs"
          >
            여성, 남성, 혼성 중 선택해 주세요. *
          </label>

          <div>
            <label className="text-gray font-medium text-[10px]">
              <input
                type="checkbox"
                {...register('groupGender')}
                // onChange={(e) => toggleCheck(e, index)}
                // checked={termsFlag[index]}
              />
            </label>
            <span className="text-gray font-medium text-[10px]">여성</span>
          </div>
          <div>
            <label className="text-gray font-medium text-[10px]">
              <input
                type="checkbox"
                {...register('groupGender')}
                // onChange={(e) => toggleCheck(e, index)}
                // checked={termsFlag[index]}
              />
            </label>
            <span className="text-gray font-medium text-[10px]">남성</span>
          </div>
          <div>
            <label className="text-gray font-medium text-[10px]">
              <input
                type="checkbox"
                {...register('groupGender')}
                // onChange={(e) => toggleCheck(e, index)}
                // checked={termsFlag[index]}
              />
            </label>
            <span className="text-gray font-medium text-[10px]">
              혼성 (그룹)
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <label
            htmlFor="groupOrSolo"
            className="text-gray font-semibold text-xs"
          >
            솔로 가수인가요? *
          </label>
          <label className="inline-block text-gray font-medium text-[10px]">
            <input
              id="groupOrSolo"
              className="mt-4 mr-1"
              type="checkbox"
              {...register('groupOrSolo', {
                // required: '닉네임을 입력해주세요.',
                // required: true,
                // boolean값도 가능하지만 문자열 값을 주면, input의 value가 없을 때 해당 문자열이 errors 객체로 반환되어 에러 메세지로 표시할 수 있다.
                // minLength: {
                //   // value의 최소 길이
                //   value: 3,
                //   message: '3글자 이상 입력해주세요.', // 에러 메세지
                // },
                // pattern: {
                //   // input의 정규식 패턴
                //   value: /^[A-za-z0-9가-힣]{3,10}$/,
                //   message: '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자', // 에러 메세지
                // },
              })}
            />
            솔로 가수입니다.
          </label>
          <label className="inline-block text-gray font-medium text-[10px]">
            <input
              id="groupOrSolo"
              className="mt-4 mr-1"
              type="checkbox"
              {...register('groupOrSolo', {
                // required: '닉네임을 입력해주세요.',
                // required: true,
                // boolean값도 가능하지만 문자열 값을 주면, input의 value가 없을 때 해당 문자열이 errors 객체로 반환되어 에러 메세지로 표시할 수 있다.
                // minLength: {
                //   // value의 최소 길이
                //   value: 3,
                //   message: '3글자 이상 입력해주세요.', // 에러 메세지
                // },
                // pattern: {
                //   // input의 정규식 패턴
                //   value: /^[A-za-z0-9가-힣]{3,10}$/,
                //   message: '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자', // 에러 메세지
                // },
              })}
            />
            그룹입니다.
          </label>
        </div>
        <div className="flex flex-col space-y-3">
          <label
            htmlFor="groupOrSolo"
            className="text-gray font-semibold text-xs"
          >
            멤버 입력 *
          </label>
        </div>

        {/* // if group, show button // if solo, hide button */}

        <button type="button" onClick={handleAddMember}>
          add
        </button>
        {members.map((_, index) => (
          <div key={uuid()}>
            <button type="button" onClick={() => handleRemoveMember(index)}>
              삭제
            </button>
            <div className="flex flex-col space-y-3">
              <label
                htmlFor="groupTicker"
                className="text-gray font-semibold text-xs"
              >
                {`${index + 1}번째 멤버 이름 (공식 프로필 예명)`}
              </label>
              <input
                id="groupTicker"
                name="groupTicker"
                className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
			sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
                placeholder="이름을 작성해 주세요."
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label
                htmlFor="fileAttachment"
                className="text-gray font-semibold text-xs"
              >
                {`${index + 1}번째 멤버 사진 (공식 사진만 가능)`}
              </label>
              <div className="border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
                <input
                  type="file"
                  id="fileAttachment"
                  className="w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  placeholder="이미지"
                  {...register('fileAttachment')}
                />
                <div className="flex flex-row items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between text-sm ">
          <button
            type="submit"
            className="flex justify-center items-center bg-rose-500 focus:outline-none focus:shadow-outline-blue text-white py-2 px-3 rounded-md"
          >
            제출하기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              id="send"
              fill="#fff"
              className="ml-2"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormPage

/* <textarea
            id="groupName"
            name="groupName"
            rows={4}
            className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
			sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
            placeholder="What's on your mind?"
          ></textarea> */
