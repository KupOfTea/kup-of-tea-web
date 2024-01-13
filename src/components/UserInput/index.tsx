import { userState } from '@/states/user'
import { useRecoilState } from 'recoil'

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
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mb-[10px]"
                >
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
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
