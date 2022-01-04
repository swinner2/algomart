import { CollectibleBase } from '@algomart/schemas'
import Image from 'next/image'

import css from './collectible-notable.module.css'

import { cmsImageLoader } from '@/utils/cms-image-loader'

export interface NotableCollectibleProps {
  collectible: CollectibleBase
}

export default function NotableCollectible({
  collectible,
}: NotableCollectibleProps) {
  return (
    <div className="relative flex flex-col h-full overflow-hidden text-center rounded-md shadow-large">
      <div className={`w-full relative h-full`}>
        <Image
          alt={collectible.title}
          layout="fill"
          className="rounded-2xl transition-all hover:opacity-80 w-full h-full"
          loader={cmsImageLoader}
          objectFit="cover"
          src={collectible.image}
        />
      </div>
      <div className={css.title}>{collectible.title}</div>
    </div>
  )
}
