import {
  AuctionDetail,
  BidHistory,
  BidHistorySortableField,
  SortDirection,
} from '@algomart/schemas'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import BidHistoryTable from '@/components/bidHistoryTable'
import Button from '@/components/button'

export interface MyAuctionDetailTemplateProps {
  auction: AuctionDetail
  bidHistory: BidHistory[]
  bidHistoryPageCurrentPage: number
  bidHistoryTotal: number
  bidHistorySortedField: BidHistorySortableField
  bidHistorySortDirection: SortDirection
  bidHistoryHandlePageChange: (page: number) => void
  bidHistorySortByChange: (
    sortField: BidHistorySortableField,
    direction: SortDirection
  ) => void
  closeAuction: () => void
}

export default function MyAuctionDetailTemplate({
  auction,
  bidHistory,
  bidHistoryPageCurrentPage,
  bidHistoryTotal,
  bidHistorySortedField,
  bidHistorySortDirection,
  bidHistoryHandlePageChange,
  bidHistorySortByChange,
  closeAuction,
}: MyAuctionDetailTemplateProps) {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-7xl md:mt-10 mt-12">
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 mt-12 items-center">
        <section className="w-full h-full my-auto">
          <Image
            src={auction.image}
            alt={'dummy'}
            width={160}
            height={160}
            objectFit="contain"
            layout="responsive"
            className="bg-gray-900 rounded-2xl w-3xl"
          />
        </section>
        <section className="mx-auto">
          <h1 className="text-blue-800 text-3xl font-bold text-center mb-4">
            {auction.title}
          </h1>
          <h2 className="text-white text-2xl text-center mb-4">
            {auction.subtitle}
          </h2>
          <div className="bg-gray-500 bg-opacity-30 rounded-2xl text-gray-200 p-8 text-xl mt-12 mx-4">
            {auction.body}
            <br />
            <span className="text-gray-200">Auction ends at 2020-02-02</span>
          </div>
          <div className="text-2xl font-bold flex flex-col text-center">
            <span className="mt-8 text-blue-800">
              ${auction.currentBidPrice}
            </span>
          </div>
          <Button onClick={closeAuction} className="w-80 mx-auto mt-8">
            Close Auction
          </Button>
        </section>
      </div>

      <div className="mt-16 max-w-full overflow-auto">
        {bidHistory.length === 0 ? (
          <span className="text-blue-800">No bid history</span>
        ) : (
          <BidHistoryTable
            bidHistory={bidHistory}
            currentPage={bidHistoryPageCurrentPage}
            total={bidHistoryTotal}
            sortedField={bidHistorySortedField}
            sortDirection={bidHistorySortDirection}
            handlePageChange={bidHistoryHandlePageChange}
            handleSortDirectionChange={bidHistorySortByChange}
          />
        )}
      </div>
    </section>
  )
}
