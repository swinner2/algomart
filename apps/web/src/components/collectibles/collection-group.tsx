import { CollectionBase } from '@algomart/schemas'
import Image from 'next/image'
import clsx from 'clsx'
import {
  PhotographIcon,
} from '@heroicons/react/solid'

import Button from '@/components/button'
import css from './collection-group.module.css'

import { cmsImageLoader } from '@/utils/cms-image-loader'

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
            loader={cmsImageLoader}
            objectFit="cover"
            src={collection.image}
            height={320}
            width={320}
          />
        <div className={css.title}>
          {collection.name}
          <Button
              fullWidth
              variant="primary"
              type="submit"
              className={css.viewButton}
            >
              View <PhotographIcon className="w-6 h-6 ml-2" />
            </Button>
        </div>
        </div>
      </div>
    </div>
  )
}
