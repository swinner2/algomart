import {
  CollectibleListWithTotal,
  CollectibleSortField,
  CollectibleWithDetails,
  DEFAULT_LOCALE,
  PackAuction,
  PackType,
  PublishedPack,
  SortDirection,
  SortOptions,
} from '@algomart/schemas'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { ApiClient } from '@/clients/api-client'
import Loading from '@/components/loading/loading'
import { useAuth } from '@/contexts/auth-context'
import DefaultLayout from '@/layouts/default-layout'
import {
  getAuthenticatedUser,
  getProfileImageForUser,
  handleUnauthenticatedRedirect,
} from '@/services/api/auth-service'
import MyCollectiblesAuctionTemplate from '@/templates/my-collectibles-auction-template'
import { isAfterNow } from '@/utils/date-time'
interface MyCollectiblesAuctionPageProps {
  avatars: { [key: string]: string | null }
  disallowBuyOrClaim: boolean | null
  isHighestBidder: boolean | null
  isOutbid: boolean | null
  isOwner: boolean | null
  isWinningBidder: boolean | null
  packAuction: PackAuction | null
  packTemplate: PublishedPack
}

export default function MyCollectiblesAuctionPage({
  avatars,
  disallowBuyOrClaim,
  isHighestBidder,
  isOutbid,
  isOwner,
  isWinningBidder,
  packAuction,
  packTemplate,
}: MyCollectiblesAuctionPageProps) {
  console.log(packTemplate)
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

  const packTemplate = await ApiClient.instance.getPublishedPackBySlug(
    context?.params?.packSlug as string,
    context.locale || DEFAULT_LOCALE
  )

  if (!packTemplate) {
    return {
      notFound: true,
    }
  }

  const avatars: { [key: string]: string | null } = {}
  let auction = null,
    isHighestBidder = null,
    isOwner = null,
    isWinningBidder = null,
    isOutbid = null

  const disallowBuyOrClaim = false

  if (packTemplate.type === PackType.Auction) {
    // Get auction data
    const auctionData = await ApiClient.instance.getAuctionPack(
      packTemplate.templateId
    )

    auction = auctionData
    const { activeBid, bids, ownerExternalId } = auctionData

    // Get bidder avatars
    await Promise.all(
      bids.map(async ({ externalId }) => {
        avatars[externalId] = await getProfileImageForUser(externalId)
      })
    )

    if (user) {
      const isClosed = !!(
        packTemplate.auctionUntil &&
        !isAfterNow(new Date(packTemplate.auctionUntil))
      )
      const userHasBids = bids?.some((b) => b.externalId === user.externalId)

      isHighestBidder = activeBid?.externalId === user.externalId
      isOwner = user && ownerExternalId === user.externalId ? true : false
      isWinningBidder = isHighestBidder && isClosed
      isOutbid = !isHighestBidder && userHasBids
    }
  }

  return {
    props: {
      avatars,
      disallowBuyOrClaim,
      isHighestBidder,
      isOutbid,
      isOwner,
      isWinningBidder,
      packAuction: auction,
      packTemplate,
    },
  }
}
