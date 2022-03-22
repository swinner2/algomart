import { CollectionBase } from '@algomart/schemas'
import { PhotographIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import Image from 'next/image'

import css from './collection-group.module.css'

export interface CollectionGroupProps {
  collection: CollectionBase
}

export default function CollectionGroup({ collection }: CollectionGroupProps) {
  return (
    <div>
      <div className={css.imageWrapper}>
        <div className={css.image}>
          <Image
            alt={collection.name}
            layout="responsive"
            objectFit="cover"
            src={collection.image}
            height={320}
            width={320}
          />
          <div className={css.title}>
            {collection.name}
            <button type="submit" className={css.viewButton}>
              View <PhotographIcon className="w-6 h-6 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
