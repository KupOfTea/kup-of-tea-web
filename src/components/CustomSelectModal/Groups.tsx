import { useRecoilValue } from 'recoil'

import { Group } from '@/services/groups'
import { selectState } from '@/states/select'

import AppBar from './AppBar'
import CustomGroupList from './List'

interface Props {
  groups: Group[]
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

export default function Groups({ groups }: Props) {
  const selection = useRecoilValue(selectState)

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <AppBar />
      <CustomGroupList type={selection.type} gender={selection.gender} />
    </div>
  )
}
