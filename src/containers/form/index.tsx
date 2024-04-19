import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import uuid from 'react-uuid'
import { Icon } from '@iconify/react'

import { RequestTeamForm } from '@/types/requestForm'

import QuestionTemplate from '@/components/QuestionTemplate'
import SelectBox from '@/components/SelectBox'

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
    { value: 'multiple', label: '그룹' },
    { value: 'single', label: '솔로 아티스트' },
  ]

  const genders = [
    { value: 'girl', label: '여성' },
    { value: 'boy', label: '남성' },
    { value: 'coed', label: '혼성' },
  ]

  const gendersForSingle = [
    { value: 'girl', label: '여성' },
    { value: 'boy', label: '남성' },
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
    'flex object-cover object-center aspect-square w-24 h-24 rounded-sm'

  return (
    <div className="w-full flex flex-col min-h-dvh h-full py-6 px-5 bg-white">
      <form
        className="w-full flex flex-col h-full pt-1 pb-20 space-y-8"
        onSubmit={handleSubmit(registerSubmit)}
      >
        <QuestionTemplate title="활동 카테고리">
          <SelectBox
            currentValue={currentType}
            keyName="type"
            allOptions={types}
            setCurrentValue={setCurrentType}
            setFormValue={setValue}
          />
        </QuestionTemplate>

        <QuestionTemplate title="아티스트 및 그룹 성별">
          <SelectBox
            keyName="gender"
            allOptions={currentGenderOptions}
            currentValue={currentGender}
            setCurrentValue={setCurrentGender}
            setFormValue={setValue}
          />
        </QuestionTemplate>

        <QuestionTemplate
          title="국문 이름"
          subTitle="아티스트 및 그룹의 국문 이름을 입력해 주세요"
        >
          <input
            {...register('name')}
            placeholder="한글 이름 ex. 방탄소년단"
            type="text"
            className="bg-white apprearance-none w-full border rounded-sm border border-black border-opacity-5  px-3.5 py-[11px] tracking-[-2%] leading-[130%] text-sm text-black text-opacity-80 font-semibold
            placeholder:text-black placeholder:text-opacity-30 placeholder:text-sm placeholder:font-medium placeholder:leading-[18.20px] focus:outline-none focus:ring-black focus:border-black focus:border-opacity-10"
          />
        </QuestionTemplate>

        <QuestionTemplate
          title="영문 이름"
          subTitle="아티스트 및 그룹의 영문 이름 또는 약자를 입력해 주세요 "
        >
          <input
            {...register('ticker')}
            placeholder="영문 이름 ex. BTS"
            type="text"
            className="bg-white apprearance-none w-full border rounded-sm border border-black border-opacity-5  px-3.5 py-[11px] tracking-[-2%] leading-[130%] text-sm text-black text-opacity-80 font-semibold
            placeholder:text-black placeholder:text-opacity-30 placeholder:text-sm placeholder:font-medium placeholder:leading-[18.20px] focus:outline-none focus:ring-black focus:border-black focus:border-opacity-10"
          />
        </QuestionTemplate>

        <QuestionTemplate
          title="로고"
          subTitle="아티스트 및 그룹의 로고 이미지를 업로드 해 주세요"
        >
          <label className="relative flex items-center w-44 h-44 rounded-md aspect-square bg-black bg-opacity-[3%] border-2 border-black border-opacity-5">
            {logoPreview !== '' ? (
              <label className="w-full h-full bg-white rounded-md">
                <div className="absolute right-1.5 top-1.5 z-20 w-[24.64px] h-[24.64px] p-[6.16px] bg-neutral-400 rounded-full justify-center items-center text-white">
                  <Icon
                    icon="streamline:pen-tool-solid"
                    width="12"
                    height="12"
                  />
                </div>
                <img
                  src={logoPreview}
                  alt=""
                  className="rounded-md aspect-square object-cover"
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
                <div className="flex flex-col text-black text-opacity-30 justify-center items-center aspect-square object-cover w-44 h-44 ">
                  <Icon
                    icon="streamline:pictures-folder-memories-solid"
                    width="32"
                    height="32"
                  />
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
        </QuestionTemplate>
        <QuestionTemplate
          title="아티스트"
          subTitle="아티스트(멤버)의 공식 프로필 기준 예명과 사진을 추가해 주세요"
        >
          <div className="w-full flex flex-col space-y-2">
            {fields.map((field, index) => (
              <label
                className="relative flex flex-col w-full items-start p-3 bg-black bg-opacity-[3%] rounded-[10px]"
                key={uuid()}
              >
                {currentType.value === 'multiple' && index !== 0 && (
                  <div className="absolute right-3 top-3">
                    <button
                      className="z-100"
                      type="button"
                      onClick={() => {
                        if (index === 0) {
                          alert('한 명 이상의 멤버를 작성해야 합니다.')
                        } else {
                          remove(index)
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_189_3423)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 15.9961C12.4183 15.9961 16 12.4144 16 7.99609C16 3.57782 12.4183 -0.00390625 8 -0.00390625C3.58173 -0.00390625 0 3.57782 0 7.99609C0 12.4144 3.58173 15.9961 8 15.9961ZM4.57143 7.13895C4.09805 7.13895 3.71429 7.52271 3.71429 7.99609C3.71429 8.46948 4.09805 8.85324 4.57143 8.85324H11.4286C11.9019 8.85324 12.2857 8.46948 12.2857 7.99609C12.2857 7.52271 11.9019 7.13895 11.4286 7.13895H4.57143Z"
                            fill="black"
                            fillOpacity="0.85"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_189_3423">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0 -0.00390625)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                )}

                <span className="text-black text-opacity-80 text-xs font-bold leading-none mb-3">{`${
                  index + 1
                }번 아티스트`}</span>
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
                  <div className="flex object-center aspect-square w-24 h-24 rounded-sm flex items-center justify-center  bg-black bg-opacity-[3%]">
                    <div className="flex flex-col text-black text-opacity-30 justify-center items-center aspect-square object-cover w-44 h-44 ">
                      <Icon
                        icon="streamline:pictures-folder-memories-solid"
                        width="21"
                        height="21"
                      />
                    </div>
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
                  placeholder="공식 이름 및 예명 ex. 에스쿱스"
                  defaultValue={field.name}
                  type="text"
                  className="bg-white mt-3 apprearance-none w-full border border-black border-opacity-5 rounded-sm px-[14px] py-[11px] text-[10px] text-black text-opacity-80 text-[13px] leading-[16.90px] font-semibold placeholder:text-[13px] placeholder:font-medium placeholder-black placeholder-opacity-30 placeholder:leading-[16.90px] focus:outline-none focus:ring-black focus:border-black focus:border-opacity-10"
                />
              </label>
            ))}
          </div>
        </QuestionTemplate>
        {currentType.value === 'multiple' && (
          <button
            className="flex flex-row w-full py-3 border border-black border-opacity-5 justify-center items-center gap-1 inline-flex rounded-sm text-black text-opacity-90 text-[13px] font-semibold leading-[16.90px]"
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
            <span>아티스트 추가</span>
            <Icon icon="fluent:add-12-regular" width="14" height="14" />
          </button>
        )}

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
