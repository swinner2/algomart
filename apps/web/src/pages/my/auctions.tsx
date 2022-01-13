import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'

import Loading from '@/components/loading/loading'
import { PAGE_SIZE } from '@/components/pagination/pagination'
import { useAuth } from '@/contexts/auth-context'
import DefaultLayout from '@/layouts/default-layout'
import {
  getAuthenticatedUser,
  handleUnauthenticatedRedirect,
} from '@/services/api/auth-service'
import MyAuctionsTemplate from '@/templates/my-auctions-template'

export default function MyAuctionsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <DefaultLayout pageTitle={t('common:pageTitles.My Auctions')} width="large">
      {false ? <Loading /> : <MyAuctionsTemplate />}
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
