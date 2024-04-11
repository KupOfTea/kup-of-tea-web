import { useRecoilState } from 'recoil'

import { userState } from '@/states/user'

interface Props {
  index: number
}

export default function CustomUserInput({ index }: Props) {
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
    <div className="flex flex-col min-w-min items-center space-y-4">
      <div className="flex flex-col text-[8px] pr-2">
        <label className="flex flex-col items-center w-36 bg-[#EEEEEE]  text-[#818181] rounded-full aspect-square border-[1px] border-[#DBDBDB]">
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
              <div className="flex flex-col justify-center items-center py-[45px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                  className="text-white"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                </svg>
                <div className="text-[12px] font-medium">이미지 업로드</div>
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
      </div>
      <input
        type="text"
        className="apprearance-none w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
        value={user?.username ?? ''}
        onChange={(e) => updateUsername(e.target.value)}
        placeholder={`${index + 1} 번째 이름`}
      />
    </div>
  )
}
