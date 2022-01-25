import { SecondaryAuctionFormStatus } from '@algomart/schemas'
import useTranslation from 'next-translate/useTranslation'
import { FormEvent } from 'react'

import CollectiblesAuctionForm from '@/components/collectibles-auction-form'
import { useAuth } from '@/contexts/auth-context'
import { CollectiblesAuctionFormValidation } from '@/pages/my/collectibles/[collectibleSlug]/auctions/add'

export interface MyCollectiblesAuctionAddTemplateProps {
  formErrors?: CollectiblesAuctionFormValidation
  loadingText: string
  onSubmit(event: FormEvent<HTMLFormElement>): void
  status?: SecondaryAuctionFormStatus
  setStatus: (status: SecondaryAuctionFormStatus) => void
}

export default function MyCollectiblesAuctionAddTemplate({
  formErrors,
  loadingText,
  onSubmit,
  status,
  setStatus,
}: MyCollectiblesAuctionAddTemplateProps) {
  return (
    <div className="mx-auto max-w-7xl mt-10">
      <CollectiblesAuctionForm
        formErrors={formErrors}
        loadingText={loadingText}
        setStatus={setStatus}
        status={status}
        onSubmit={onSubmit}
      />
    </div>
  )
}
