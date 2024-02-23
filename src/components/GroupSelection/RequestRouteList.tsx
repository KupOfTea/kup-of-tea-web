export default function RequestRouteList() {
  return (
    <div className="my-5 w-full flex flex-col border-t border-base-200">
      <div className="w-full">
        <a
          href="https://forms.gle/xkrDGoCzuMKsBa6d6"
          className="w-full flex flex-row py-4 px-5 cursor-pointer justify-between text-gray-900 text-base font-bold border-b border-base-200"
        >
          <div className="flex flex-row items-start justify-start space-x-2">
            <div className="object-contain object-center aspect-square w-6 h-6" />
            <div>팀 추가 요청</div>
          </div>
          <div>→</div>
        </a>
        <a
          href="https://form.naver.com/response/_qX7__EDWxJXHX-q1xBapA"
          className="w-full flex flex-row py-4 px-5 cursor-pointer justify-between text-gray-900 text-base font-bold border-b border-base-200"
        >
          <div className="flex flex-row items-start justify-start space-x-2">
            <div className="object-contain object-center aspect-square w-6 h-6" />
            <div>생일 광고 신청</div>
          </div>
          <div>→</div>
        </a>
        <a
          href="https://naver.me/xJqksBZf"
          className="w-full flex flex-row py-4 px-5 cursor-pointer justify-between text-gray-900 text-base font-bold border-b border-base-200"
        >
          <div className="flex flex-row items-start justify-start space-x-2">
            <div className="object-contain object-center aspect-square w-6 h-6" />
            <div>기타 건의</div>
          </div>
          <div>→</div>
        </a>
      </div>
    </div>
  )
}
