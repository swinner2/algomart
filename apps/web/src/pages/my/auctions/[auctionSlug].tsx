import {
  AuctionDetail,
  BidHistory,
  BidHistorySortableField,
  SortDirection,
} from '@algomart/schemas'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import Loading from '@/components/loading/loading'
import { useAuth } from '@/contexts/auth-context'
import DefaultLayout from '@/layouts/default-layout'
import {
  getAuthenticatedUser,
  handleUnauthenticatedRedirect,
} from '@/services/api/auth-service'
import MyAuctionDetailTemplate from '@/templates/my-auction-detail-template'

interface MyAuctionDetailPageProps {
  auction: AuctionDetail
}

export default function MyAuctionDetailsPage({
  auction,
}: MyAuctionDetailPageProps) {
  const { user } = useAuth()
  const router = useRouter()

  const [bidHistorySortBy, setBidHistorySortBy] =
    useState<BidHistorySortableField>(BidHistorySortableField.BidId)
  const [bidHistorySortDirection, setBidHistorySortDirection] =
    useState<SortDirection>(SortDirection.Descending)
  const [bidHistoryCurrentPage, setBidHistoryCurrentPage] = useState<number>(1)

  // TODO: fetch bid history based on the sort, page
  const loading = false
  const bidHistoryTotal = 3
  const bidHistory: BidHistory[] = [
    {
      bidId: '1',
      bidder: 'James',
      price: 150,
      bidAt: `2022-05-25 12:30:30`,
    },
    {
      bidId: '2',
      bidder: 'John',
      price: 120,
      bidAt: `2022-05-25 12:30:30`,
    },
    {
      bidId: '3',
      bidder: 'Chris',
      price: 130,
      bidAt: `2022-05-25 12:30:30`,
    },
  ]

  const handleBidHistoryPageChange = useCallback((pageNumber: number) => {
    setBidHistoryCurrentPage(pageNumber)
  }, [])

  const handleBidHistorySortByChange = useCallback(
    (sortField: BidHistorySortableField, direction: SortDirection) => {
      setBidHistorySortBy(sortField)
      setBidHistorySortDirection(direction)
    },
    []
  )

  return (
    <DefaultLayout pageTitle={auction.title} panelPadding width="large">
      {loading ? (
        <Loading />
      ) : (
        <MyAuctionDetailTemplate
          auction={auction}
          bidHistory={bidHistory}
          bidHistoryPageCurrentPage={bidHistoryCurrentPage}
          bidHistoryTotal={bidHistoryTotal}
          bidHistorySortedField={bidHistorySortBy}
          bidHistorySortDirection={bidHistorySortDirection}
          bidHistoryHandlePageChange={handleBidHistoryPageChange}
          bidHistorySortByChange={handleBidHistorySortByChange}
          closeAuction={() => {
            console.log('close auction')
          }}
        />
      )}
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getAuthenticatedUser(context)
  if (!user) {
    return handleUnauthenticatedRedirect(context.resolvedUrl)
  }

  // TODO: api call here
  // const slug = context.params?.auctionSlug as string

  // if (!auction) {
  //   return {
  //     notFound: true,
  //   }
  // }

  return {
    props: {
      auction: {
        auctionId: 1,
        image:
          'https://cms.algomart-og2d.seanwinner.com/assets/fad80f0d-45ab-4be2-88bc-f0304d9026de',
        title: 'Test Title',
        subtitle: 'Test SubTitle',
        body: 'Test description. This is the first auction. Algorand smart contract is working!',
        currentBidPrice: 500,
        endTime: `2022-05-05 12:30:23`,
      },
    },
  }
}
