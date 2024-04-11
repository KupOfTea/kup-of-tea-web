import { useRecoilState } from 'recoil'

import { userState } from '@/states/user'

interface Props {
  index: number
}

export default function UserInput({ index }: Props) {
  const [user, setUser] = useRecoilState(userState(`u${index}`))

  const updateUsername = (name: string) => {
    const newProfile = {
      ...user,
      username: name,
    }
    setUser(newProfile)
  }

  const updateImage = (img: string) => {
    const newProfile = {
      ...user,
      image: img,
    }
    setUser(newProfile)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      const fileURL = URL.createObjectURL(file)
      updateImage(fileURL)
    }
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <label className="flex items-center w-11 rounded-full aspect-square bg-black bg-opacity-5 border-black border-opacity-10">
        {user?.image ? (
          <label>
            <img
              src={user?.image}
              alt=""
              className="rounded-full aspect-square object-cover"
            />
            <input
              onChange={handleImageChange}
              className="hidden"
              type="file"
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
              onChange={handleImageChange}
              className="hidden"
              type="file"
              accept="image/*"
            />
          </div>
        )}
      </label>
      <div className="w-3" />
      <input
        type="text"
        className="my-1 bg-white apprearance-none w-full border border-black border-opacity-10 rounded-sm px-[14px] py-[10px] tracking-[-2%] leading-[130%] text-base text-black text-opacity-80 font-semibold placeholder:text-base placeholder:font-normal placeholder-black placeholder-opacity-30 focus:outline-none focus:ring-black focus:border-black focus:border-opacity-10"
        value={user?.username ?? ''}
        onChange={(e) => updateUsername(e.target.value)}
        placeholder="이름"
      />
    </div>
  )
}
