import {
  CollectibleListWithTotal,
  CollectibleSortField,
  CollectibleWithDetails,
  SortDirection,
  SortOptions,
} from '@algomart/schemas'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Loading from '@/components/loading/loading'
import { useAuth } from '@/contexts/auth-context'
import DefaultLayout from '@/layouts/default-layout'
import {
  getAuthenticatedUser,
  handleUnauthenticatedRedirect,
} from '@/services/api/auth-service'
import MyCollectiblesAuctionTemplate from '@/templates/my-collectibles-auction-template'

export default function MyCollectiblesAuctionPage() {
  const { user } = useAuth()
  const collectible = true
  const { t } = useTranslation()

  return (
    <DefaultLayout
      pageTitle={t('common:pageTitles.My Collectibles Auctions')}
      panelPadding
      width="large"
    >
      {!collectible ? <Loading /> : <MyCollectiblesAuctionTemplate />}
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
