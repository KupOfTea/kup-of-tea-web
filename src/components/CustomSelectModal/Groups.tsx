import { useRecoilValue } from 'recoil'
import uuid from 'react-uuid'

import { Group, useGroups } from '@/services/groups'
import { selectState } from '@/states/select'
import { getImageUrl } from '@/shared/getImageUrl'

import AppBar from './AppBar'
import SkeletonImage from '../SkeletonImage'

interface Props {
  close: () => void
  handleClick: (group: Group) => Promise<void>
}

// export default function Groups({ groups, handleClick }: Props) {
//   return (

//     <div className="grid grid-cols-5 gap-3">
//       {groups.map((group) => {
//         return (
//           <button
//             key={uuid()}
//             onClick={() => handleClick(group)}
//             className="flex flex-col items-center space-y-3 cursor-pointer justify-center"
//           >
//             <SkeletonImage
//               className="object-contain object-center w-8 h-8 aspect-square"
//               src={getImageUrl(group.logo ?? '')}
//               alt={group.name ?? ''}
//               width={100}
//               height={100}
//             />
//             <p className="text-gray-900 text-[8px] font-semibold">{`${group.name}`}</p>
//           </button>
//         )
//       })}
//     </div>
//   )
// }

export default function Groups({ close, handleClick }: Props) {
  const selection = useRecoilValue(selectState)

  const { groups, isLoading, isError } = useGroups(
    selection.type,
    selection.gender,
  )

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <AppBar close={close} />
      <div className="my-5 w-full grid grid-cols-4 gap-x-1 gap-y-6 px-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Loading failed</p>}
        {groups &&
          groups
            .sort((a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
            )
            .map((group) => {
              return (
                <button
                  key={uuid()}
                  onClick={() => handleClick(group)}
                  className="w-full flex flex-col cursor-pointer items-center text-gray-900 text-[11px] font-medium"
                >
                  <SkeletonImage
                    className="object-contain object-center aspect-square w-10 h-10 my-5 tracking-[-6%]"
                    src={getImageUrl(group.logo ?? '')}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <div>{group.name}</div>
                </button>
              )
            })}
      </div>
    </div>
  )
}
