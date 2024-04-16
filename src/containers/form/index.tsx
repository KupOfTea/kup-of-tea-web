import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import uuid from 'react-uuid'

import { RequestTeamForm } from '@/types/requestForm'

import FormSelection from '@/components/FormSelection'

export default function RequestForm() {
  const { register, control, handleSubmit, watch, getValues, setValue } =
    useForm<RequestTeamForm>({
      defaultValues: {
        name: '',
        ticker: '',
        logo: '',
        type: 'multiple',
        gender: 'boy',
        members: [
          {
            name: '',
            image: '',
          },
        ],
      },
    })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'members',
  })

  const types = [
    { value: 'multiple', label: '그룹입니다.' },
    { value: 'single', label: '솔로 가수입니다.' },
  ]

  const genders = [
    { value: 'boy', label: '보이그룹입니다.' },
    { value: 'girl', label: '걸그룹입니다.' },
    { value: 'coed', label: '혼성 그룹입니다.' },
  ]

  const gendersForSingle = [
    { value: 'boy', label: '남자 솔로 가수입니다.' },
    { value: 'girl', label: '여자 솔로 가수입니다.' },
  ]

  const registerSubmit = (data: RequestTeamForm) => {
    console.log(data)
  }

  const [logoPreview, setLogoPreview] = useState('')

  const logo = watch('logo')

  const [currentType, setCurrentType] = useState(types[0])
  const [currentGenderOptions, setCurrentGenderOptions] = useState(genders)
  const [currentGender, setCurrentGender] = useState(genders[0])

  useEffect(() => {
    if (logo && logo.length > 0) {
      const file = logo[0]
      setLogoPreview(URL.createObjectURL(file))
    }
  }, [logo])

  useEffect(() => {
    if (currentType.value === 'multiple') {
      setCurrentGender(genders[0])
      setCurrentGenderOptions(genders)
    }
    if (currentType.value === 'single') {
      setCurrentGender(gendersForSingle[0])
      setCurrentGenderOptions(gendersForSingle)
      replace([
        {
          name: '',
          image: '',
        },
      ])
    }
  }, [currentType])

  const memberTitle =
    currentType.value === 'single'
      ? '해당 가수의 프로필을 작성해 주세요.'
      : '해당 팀에 속한 멤버들의 프로필을 작성해 주세요.'

  const imageClass =
    'flex object-cover object-center aspect-square my-1 w-full rounded-[4px]'

  return (
    <div className="w-full flex flex-col h-dvh py-4 bg-[#FAFAFA]">
      <form
        className="w-full flex flex-col h-full pt-1 pb-20"
        onSubmit={handleSubmit(registerSubmit)}
      >
        <div className="w-full px-5">
          <div className="flex flex-row items-center justify-center my-4">
            <label className="flex items-center w-11 rounded-full aspect-square bg-black bg-opacity-5 border-black border-opacity-10">
              {logoPreview !== '' ? (
                <label>
                  <img
                    src={logoPreview}
                    alt=""
                    className="rounded-full aspect-square object-cover"
                  />
                  <input
                    {...register('logo')}
                    placeholder=" K-POP 그룹(또는 솔로 아티스트) 로고 이미지 *"
                    id="picture"
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              ) : (
                <div>
                  <div className="flex flex-col justify-center items-center rounded-full aspect-square object-cover w-11 h-11 bg-black bg-opacity-5 border-black border-opacity-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#0000004D"
                      className="w-6 h-6"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="12" r="3.2" />
                      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    </svg>
                  </div>
                  <input
                    {...register('logo')}
                    placeholder=" K-POP 그룹(또는 솔로 아티스트) 로고 이미지 *"
                    id="picture"
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              )}
            </label>
            <div className="w-3" />
            <input
              {...register('name')}
              placeholder="K-POP 그룹(또는 솔로 아티스트) 이름 *"
              className="bg-white apprearance-none w-full border border-black border-opacity-10 rounded-sm px-[14px] py-[10px] tracking-[-2%] leading-[130%] text-base text-black text-opacity-80 font-semibold placeholder:text-base placeholder:font-normal placeholder-black placeholder-opacity-30 focus:outline-none focus:ring-black focus:border-black focus:border-opacity-10"
              type="text"
            />
          </div>
          <input
            {...register('ticker')}
            className="my-4 bg-white apprearance-none w-full border border-black border-opacity-10 rounded-sm px-[14px] py-[10px] tracking-[-2%] leading-[130%] text-base text-black text-opacity-80 font-semibold placeholder:text-base placeholder:font-normal placeholder-black placeholder-opacity-30 focus:outline-none focus:ring-black focus:border-black focus:border-opacity-10"
            placeholder="K-POP 그룹(또는 솔로 아티스트) 영어 이름 or 약자 *"
            type="text"
          />
        </div>
        <FormSelection
          keyName="type"
          allOptions={types}
          currentValue={currentType}
          setCurrentValue={setCurrentType}
          setFormValue={setValue}
        />
        <FormSelection
          keyName="gender"
          allOptions={currentGenderOptions}
          currentValue={currentGender}
          setCurrentValue={setCurrentGender}
          setFormValue={setValue}
        />
        <div className="flex flex-col w-full px-5 items-center">
          <p className="font-semibold text-sm">{memberTitle}</p>

          <div className="w-full grid grid-cols-3 mt-5 gap-x-1 gap-y-4 justify-items-center">
            {fields.map((field, index) => (
              <label className="flex flex-col w-full items-center" key={uuid()}>
                {watch(`members.${index}.image`) &&
                watch(`members.${index}.image`).length > 0 ? (
                  <label>
                    <img
                      className={imageClass}
                      src={URL.createObjectURL(
                        watch(`members.${index}.image`)[0] as any,
                      )}
                      alt=""
                      width={100}
                      height={100}
                    />
                    <input
                      {...register(`members.${index}.image`)}
                      placeholder="멤버 프로필 이미지 *"
                      id="picture"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                ) : (
                  <div className="w-full rounded-[4px] aspect-square flex items-center justify-center bg-black bg-opacity-5 my-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1_194)">
                        <circle
                          opacity="0.4"
                          cx="12.5"
                          cy="12.5"
                          r="12"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.5 12.5C24.5 19.1274 19.1274 24.5 12.5 24.5C5.87259 24.5 0.5 19.1274 0.5 12.5C0.5 5.87259 5.87259 0.5 12.5 0.5C19.1274 0.5 24.5 5.87259 24.5 12.5ZM12.5 6.07143C13.2101 6.07143 13.7857 6.64707 13.7857 7.35714V11.2143H17.6429C18.3529 11.2143 18.9286 11.7899 18.9286 12.5C18.9286 13.2101 18.3529 13.7857 17.6429 13.7857H13.7857V17.6429C13.7857 18.3529 13.2101 18.9286 12.5 18.9286C11.7899 18.9286 11.2143 18.3529 11.2143 17.6429V13.7857H7.35714C6.64707 13.7857 6.07143 13.2101 6.07143 12.5C6.07143 11.7899 6.64707 11.2143 7.35714 11.2143H11.2143V7.35714C11.2143 6.64707 11.7899 6.07143 12.5 6.07143Z"
                          fill="black"
                          fillOpacity="0.15"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_194">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.5 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <input
                      {...register(`members.${index}.image`)}
                      placeholder="멤버 프로필 이미지 *"
                      id="picture"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                )}
                <input
                  {...register(`members.${index}.name`)}
                  placeholder="멤버 이름"
                  defaultValue={field.name}
                  type="text"
                  className="bg-white mt-1 mb-6 apprearance-none w-full border border-black border-opacity-10 rounded-[4px] px-[6px] py-[4px] tracking-[-2%] leading-[130%] text-[10px] text-black text-opacity-80 font-normal placeholder:text-[10px] placeholder:font-light placeholder-black placeholder-opacity-30 focus:outline-none focus:ring-black focus:border-black focus:border-opacity-10"
                />
                {currentType.value === 'multiple' && (
                  <button
                    className="bg-black bg-opacity-10 rounded-sm px-1 py-0.5 text-[10px] border border-gray-500 text-gray-700 font-semibold"
                    type="button"
                    onClick={() => {
                      if (index === 0) {
                        alert('한 명 이상의 멤버를 작성해야 합니다.')
                      } else {
                        remove(index)
                      }
                    }}
                  >
                    Remove
                  </button>
                )}
              </label>
            ))}
          </div>
          {currentType.value === 'multiple' && (
            <button
              className="mb-5 mt-3 flex flex-col w-full items-center justify-start px-4 py-3 border border-gray-300 rounded-md mb-2"
              type="button"
              onClick={() => {
                if (currentType.value === 'multiple') {
                  append({
                    name: '',
                    image: '',
                  })
                }
                if (currentType.value === 'single') {
                  alert(
                    '솔로 가수는 멤버를 추가할 수 없습니다.\n솔로 가수의 이름과 프로필 사진을 작성해 주세요.',
                  )
                }
              }}
            >
              멤버 추가
            </button>
          )}
        </div>

        <div className="bg-white fixed max-w-lg flex left-0 right-0 mx-auto bottom-0 w-full justify-center items-center py-3 px-5">
          <button
            type="submit"
            className="w-full py-4 bg-black text-white font-semibold text-center text-[16px] rounded-[8px] tracking-[-2%] leading-[130%]"
          >
            제출하기
          </button>
        </div>
      </form>
    </div>
  )
}
