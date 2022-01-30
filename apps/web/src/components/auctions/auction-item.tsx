import { AdjustmentsIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import css from './auction-item.module.css'

import AppLink from '@/components/app-link/app-link'
import { cmsImageLoader } from '@/utils/cms-image-loader'

export interface AuctionItemProps {
  auctionId: string
  image: string
  title: string
  subtitle: string
  body: string
  currentBidPrice?: number
  endTime: string
  auctionLink: string
}

export default function AuctionItem({
  image,
  title,
  currentBidPrice,
  endTime,
  auctionLink,
}: AuctionItemProps) {
  const { t } = useTranslation()

  return (
    <div className={css.root}>
      <div className={css.imageWrapper}>
        <Image
          loader={cmsImageLoader}
          src={image}
          alt={image}
          width={160}
          height={160}
          objectFit="cover"
          layout="responsive"
          className="bg-gray-900 rounded-2xl"
        />
        <div className={css.actions}>
          <AppLink className={css.action} href={auctionLink}>
            View Details <AdjustmentsIcon className="w-6 h-6 ml-2" />
          </AppLink>
        </div>
      </div>
      <div className="text-white px-4 py-2">
        <div className="text-white text-2xl font-bold">{title}</div>
        <div className="my-2">
          <div className="flex">
            <span className="text-blue-800 w-20 font-bold">Price</span>
            <span className="text-white">${currentBidPrice}</span>
          </div>
          <div className="flex">
            <span className="text-blue-800 w-20 font-bold">Ends in</span>
            <span className="text-white">{endTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
