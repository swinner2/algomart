import { SecondaryAuctionFormStatus } from '@algomart/schemas'
import useTranslation from 'next-translate/useTranslation'
import { FormEvent, useCallback, useState } from 'react'
import Image from 'next/image'

import TextInput from '../text-input/text-input'
import Select from '../select/select'

import AlertMessage from '@/components/alert-message/alert-message'
import Button from '@/components/button'
import Heading from '@/components/heading'
import Loading from '@/components/loading/loading'
import { CollectiblesAuctionFormValidation } from '@/pages/my/collectibles/[collectibleSlug]/auctions/add'
import { cmsImageLoader } from '@/utils/cms-image-loader'

export interface CollectiblesAuctionFormProps {
  formErrors?: CollectiblesAuctionFormValidation
  loadingText: string
  onSubmit(event: FormEvent<HTMLFormElement>): void
  status?: SecondaryAuctionFormStatus
  setStatus: (status: SecondaryAuctionFormStatus) => void
}

export default function CollectiblesAuctionForm({
  formErrors,
  loadingText,
  onSubmit,
  setStatus,
  status,
}: CollectiblesAuctionFormProps) {
  const { t } = useTranslation()
  const handleRetry = useCallback(() => {
    setStatus('form')
  }, [setStatus])
  const auctionType = [
    { id: 'purchase', label: 'Purchase' },
    { id: 'auction', label: 'Auction' },
  ]

  return (
    <section className="pt-5">
      <div
        className={`grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 ${
          status === 'form' ? '' : 'hidden'
        }`}
      >
        <Image
          src="https://cms.algomart-og2d.seanwinner.com/assets/67cf396e-2679-4213-9896-70f8d1a6e610?width=3840&quality=75"
          alt={'dummy'}
          width={160}
          height={160}
          objectFit="contain"
          layout="responsive"
          className="bg-gray-900 rounded-2xl w-3xl"
        />
        <form className="w-full px-4" onSubmit={onSubmit}>
          <Heading
            level={2}
            className="mb-8 text-2xl text-center text-blue-800"
          >
            {t('forms:sections.Collectible Auction')}
          </Heading>
          <TextInput
            error={formErrors?.collectibleId as string}
            label={t('forms:fields.collectibleId.label')}
            name="collectibleId"
            placeholder="Enter collectible ID"
            variant="small"
            className="my-3"
          />
          <Select
            options={auctionType}
            defaultOption={auctionType[1]}
            className="w-full my-3"
            label={t('forms:fields.auctionType.label')}
            name="auctionType"
          />
          <TextInput
            error={formErrors?.royalty as string}
            label={t('forms:fields.royalty.label')}
            name="royalties"
            placeholder="Royalties"
            variant="small"
            className="my-3"
            type={'number'}
            min={0}
          />
          <TextInput
            error={formErrors?.reservePrice as string}
            label={t('forms:fields.reservePrice.label')}
            name="reservePrice"
            placeholder="Enter reserve price"
            variant="small"
            className="my-3"
            type={'number'}
            min={0}
          />
          <TextInput
            error={formErrors?.expiresAt as string}
            label={t('forms:fields.expiresAt.label')}
            name="expiresAt"
            placeholder="Auction until"
            variant="small"
            className="my-3"
            type={'datetime-local'}
          />
          {/* Submit */}
          <Button
            fullWidth
            type="submit"
            variant="primary"
            className="my-3"
            size="small"
          >
            {t('common:actions.Auction Collectible')}
          </Button>
        </form>
        <div></div>
      </div>

      {status === 'loading' && (
        <Loading loadingText={loadingText} variant="primary" />
      )}

      {status === 'success' && 'Success'}

      {status === 'error' && 'Error'}
    </section>
  )
}
