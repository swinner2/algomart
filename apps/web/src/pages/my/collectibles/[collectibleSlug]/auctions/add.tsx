import { SecondaryAuctionFormStatus } from '@algomart/schemas'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { FormEvent, useCallback, useMemo, useState } from 'react'
import { ExtractError } from 'validator-fns'

import Loading from '@/components/loading/loading'
import { useAuth } from '@/contexts/auth-context'
import DefaultLayout from '@/layouts/default-layout'
import {
  getAuthenticatedUser,
  handleUnauthenticatedRedirect,
} from '@/services/api/auth-service'
import MyCollectiblesAuctionAddTemplate from '@/templates/my-collectibles-auction-add-template'
import { toJSON } from '@/utils/form-to-json'
import { validateSecondaryAuctionForm } from '@/utils/secondary-auction-validation'

export type CollectiblesAuctionFormValidation = ExtractError<
  ReturnType<typeof validateSecondaryAuctionForm>
>

export default function MyCollectiblesAuctionAddPage() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [formErrors, setFormErrors] =
    useState<CollectiblesAuctionFormValidation>()
  const [loadingText, setLoadingText] = useState<string>('')
  const [status, setStatus] = useState<SecondaryAuctionFormStatus>('form')
  const validateFormForSecondaryAuction = useMemo(
    () => validateSecondaryAuctionForm(t),
    [t]
  )

  const handleAddCollectiblesAuction = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      const body = toJSON(data)
      const formValidation = await validateFormForSecondaryAuction(body)

      if (!formValidation.isValid) {
        setFormErrors(formValidation.errors)
        console.error('Errors:', formValidation.errors)
        setStatus('form')
        return
      }

      console.log(body)
    },
    []
  )

  return (
    <DefaultLayout
      pageTitle={t('common:pageTitles.My Collectibles Auctions')}
      panelPadding
      width="large"
    >
      <MyCollectiblesAuctionAddTemplate
        onSubmit={handleAddCollectiblesAuction}
        formErrors={formErrors}
        loadingText={loadingText}
        setStatus={setStatus}
        status={status}
      />
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getAuthenticatedUser(context)
  if (!user) {
    return handleUnauthenticatedRedirect(context.resolvedUrl)
  }

  return {
    props: {},
  }
}
