import { SecondaryAuctionFormStatus } from '@algomart/schemas'
import useTranslation from 'next-translate/useTranslation'
import { FormEvent, useCallback, useState } from 'react'

import TextInput from '../text-input/text-input'

import AlertMessage from '@/components/alert-message/alert-message'
import Button from '@/components/button'
import Heading from '@/components/heading'
import Loading from '@/components/loading/loading'
import { CollectiblesAuctionFormValidation } from '@/pages/my/collectibles/[collectibleSlug]/auctions/add'

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

  return (
    <section className="pt-5">
      <div className={status === 'form' ? '' : 'hidden'}>
        <form className="" onSubmit={onSubmit}>
          <Heading level={2}>{t('forms:sections.Collectible Auction')}</Heading>
          <TextInput
            error={formErrors?.collectibleId as string}
            label={t('forms:fields.collectibleId.label')}
            name="collectibleId"
            placeholder="Enter collectible ID"
            variant="small"
          />
          <TextInput
            error={formErrors?.auctionType as string}
            label={t('forms:fields.auctionType.label')}
            name="auctionType"
            placeholder="purchase or auction"
            variant="small"
          />
          <TextInput
            error={formErrors?.royalty as string}
            label={t('forms:fields.royalty.label')}
            name="royalties"
            placeholder="Royalties"
            variant="small"
          />
          <TextInput
            error={formErrors?.reservePrice as string}
            label={t('forms:fields.reservePrice.label')}
            name="reservePrice"
            placeholder="Enter reserve price"
            variant="small"
          />
          <TextInput
            error={formErrors?.expiresAt as string}
            label={t('forms:fields.expiresAt.label')}
            name="expiresAt"
            placeholder="Auction until"
            variant="small"
          />
          {/* Submit */}
          <Button
            fullWidth
            type="submit"
            variant="primary"
            className=""
            size="small"
          >
            {t('common:actions.Auction Collectible')}
          </Button>
        </form>
      </div>

      {status === 'loading' && (
        <Loading loadingText={loadingText} variant="primary" />
      )}

      {status === 'success' && 'Success'}

      {status === 'error' && 'Error'}
    </section>
  )
}
