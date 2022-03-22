import { CollectibleBase } from '@algomart/schemas'
import clsx from 'clsx'
import Image from 'next/image'

import css from './collectible-notable.module.css'

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
          height={250}
          layout="responsive"
          objectFit="contain"
          src={collectible.image}
          width={250}
          sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className={css.title}>{collectible.title}</div>
    </div>
  )
}
