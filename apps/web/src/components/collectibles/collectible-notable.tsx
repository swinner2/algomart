import { CollectibleBase } from '@algomart/schemas'
import Image from 'next/image'
import clsx from 'clsx'

import css from './collectible-notable.module.css'

import { cmsImageLoader } from '@/utils/cms-image-loader'

export interface NotableCollectibleProps {
  collectible: CollectibleBase
}

export default function NotableCollectible({
  collectible,
}: NotableCollectibleProps) {
  return (
    <div
      className={clsx(
        css.content,
        'relative flex flex-col h-full overflow-hidden text-center rounded-2xl shadow-large bg-gray-900'
      )}
    >
      <div className={`w-full relative h-full`}>
        <Image
          alt={collectible.title}
          layout="fill"
          className="rounded-2xl w-full h-full"
          loader={cmsImageLoader}
          objectFit="cover"
          src={collectible.image}
        />
      </div>
      <div className={css.title}>{collectible.title}</div>
    </div>
  )
}
