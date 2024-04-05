import uuid from 'react-uuid'

interface IMenu {
  route: string
  title: string
}

export default function RequestRouteList() {
  const menus: IMenu[] = [
    {
      route: 'https://forms.gle/xkrDGoCzuMKsBa6d6',
      title: '팀 추가요청',
    },
    {
      route: 'https://form.naver.com/response/_qX7__EDWxJXHX-q1xBapA',
      title: '생일 광고 신청',
    },
    {
      route: 'https://naver.me/xJqksBZf',
      title: '기타 건의',
    },
  ]

  return (
    <div className="mb-5 px-4 w-full flex flex-col">
      <div className="w-full flex flex-col">
        {menus.map((menu) => (
          <a
            key={uuid()}
            href={menu.route}
            className="w-full flex flex-row justify-between items-center px-1.5 py-4 font-medium text-base text-gray-900 border-b border-gray-100"
          >
            <div>{menu.title}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
