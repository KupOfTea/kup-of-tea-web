import { useFieldArray, useForm } from 'react-hook-form'
import uuid from 'react-uuid'

interface RequestTeamForm {
  name: string
  ticker: string
  image: string
  type: string
  gender: string
  members: RequestMemberForm[]
}

interface RequestMemberForm {
  name: string
  image: string
}

export default function RequestForm() {
  const { register, control, handleSubmit } = useForm<RequestTeamForm>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })

  const types = [
    { value: 'single', label: '솔로 가수입니다.' },
    { value: 'multiple', label: '그룹입니다.' },
  ]

  const genders = [
    { value: 'girl', label: '걸그룹 (여자 솔로)입니다.' },
    { value: 'boy', label: '보이그룹 (남자 솔로)입니다.' },
    { value: 'coed', label: '혼성 그룹입니다.' },
  ]

  const registerSubmit = (data: RequestTeamForm) => {
    console.log(data)
  }

  const [avatarPreview, setAvatarPreview] = useState('')

  return (
    <div className="w-full flex flex-col h-dvh">
      <form
        className="w-full flex flex-col h-full space-y-4"
        onSubmit={handleSubmit(registerSubmit)}
      >
        <input
          {...register('name')}
          placeholder="K-POP 그룹(또는 솔로 아티스트) 이름 *"
          type="text"
        />
        <input
          {...register('ticker')}
          placeholder="K-POP 그룹(또는 솔로 아티스트) 영어 이름 or 약자 *"
          type="text"
        />
        <label className="flex items-center w-11 rounded-full aspect-square bg-black bg-opacity-5 border-black border-opacity-10">
          {user?.image ? (
            <label>
              <img
                src={user?.image}
                alt=""
                className="rounded-full aspect-square object-cover"
              />
              <input
                {...register('image')}
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
                {...register('image')}
                placeholder=" K-POP 그룹(또는 솔로 아티스트) 로고 이미지 *"
                id="picture"
                type="file"
                className="hidden"
                accept="image/*"
              />
            </div>
          )}
        </label>
        {/* <label className="flex items-center w-11 rounded-full aspect-square bg-black bg-opacity-5 border-black border-opacity-10">
          (
          <input
            {...register('image')}
            placeholder=" K-POP 그룹(또는 솔로 아티스트) 로고 이미지 *"
            id="picture"
            type="file"
            className="hidden"
            accept="image/*"
          />
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
              {...register('image')}
              className="hidden"
              type="file"
              accept="image/*"
            />
          </div>
          )
        </label> */}

        <select {...register('type')}>
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <select {...register('gender')}>
          {genders.map((gender) => (
            <option key={gender.value} value={gender.value}>
              {gender.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() =>
            append({
              name: '',
              image: '',
            })
          }
        >
          멤버 추가
        </button>
        {fields.map((field, index) => (
          <div className="flex flex-row" key={uuid()}>
            <input
              {...register(`members.${index}.name`)}
              placeholder="멤버 이름"
              defaultValue={field.name}
              type="text"
            />
            <label className="flex items-center w-11 rounded-full aspect-square bg-black bg-opacity-5 border-black border-opacity-10">
              <input
                {...register(`members.${index}.image`)}
                placeholder="멤버 프로필 이미지 *"
                id="picture"
                type="file"
                className="hidden"
                accept="image/*"
              />
            </label>

            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
