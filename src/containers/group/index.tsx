import classNames from 'classnames'
import Image from 'next/image'

import { Group } from '@/client/groups'
import { getImageUrl } from '@/shared/getImageUrl'

import NavigationButton from '@/components/NavigationButton'

interface Props {
  group: Group
}

const GroupPage = ({ group }: Props) => {
  return (
    <>
      <div
        className={classNames(
          'mb-20 text-3xl font-black text-black flex flex-col text-center',
          '.service-title',
        )}
      >
        <div>{group?.name || ''}</div>
        <div>취향표</div>
      </div>
      {group?.logo ? (
        <Image
          className="object-contain w-[50%] aspect-square mb-10"
          src={getImageUrl(group?.logo)}
          alt=""
          width={1000}
          height={1000}
          unoptimized
        />
      ) : (
        <div className="object-cover w-[50%] aspect-square mb-10" />
      )}
      <div className="mb-10 flex flex-col w-full space-y-5 items-center justify-center">
        <NavigationButton path="single" title="1인용 취향표" border />
        <NavigationButton path="multiple" title="6인용 취향표" border={false} />
      </div>
    </>
  )
}

export default GroupPage
