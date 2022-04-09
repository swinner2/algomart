import { AuctionDetail } from '@algomart/schemas'
import useTranslation from 'next-translate/useTranslation'

import css from './my-auctions-template.module.css'

import AuctionItem from '@/components/auctions/auction-item'
import NoAuctionsContent from '@/components/collectibles/no-auctions-content'
import Grid from '@/components/grid/grid'
import Pagination, { PAGE_SIZE } from '@/components/pagination/pagination'
import Select, { SelectOption } from '@/components/select/select'
import Tabs from '@/components/tabs/tabs'
import { getCollectionTabs } from '@/utils/collections'
import { urls } from '@/utils/urls'

export interface MyAuctionsTemplateProps {
  auctions: AuctionDetail[]
  handleNoAuctionRedirect: () => void
  handlePageChange: (pageNumber: number) => void
  handleSortChange: (option: SelectOption) => void
  selectOptions: SelectOption[]
  selectedOption: SelectOption
  currentPage: number
  totalAuctions: number
}

export default function MyAuctionsTemplate({
  auctions,
  handleNoAuctionRedirect,
  handleSortChange,
  selectOptions,
  selectedOption,
  currentPage,
  handlePageChange,
  totalAuctions,
}: MyAuctionsTemplateProps) {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-7xl mt-10 px-2">
      {/* Tabs */}
      <Tabs activeTab={3} tabs={getCollectionTabs(t)} className="-mx-8 -mt-8" />
      {auctions.length > 0 ? (
        <>
          <div className={css.selectWrapper}>
            <Select
              handleChange={handleSortChange}
              id="sortOption"
              options={selectOptions}
              selectedValue={selectedOption}
              label="Sort by"
              horizontal
            />
          </div>
          <Grid>
            {auctions.map((auction) => (
              <AuctionItem
                key={auction.auctionId}
                auctionId={auction.auctionId}
                image={auction.image}
                title={auction.title}
                subtitle={auction.subtitle}
                body={auction.body}
                currentBidPrice={auction.currentBidPrice}
                endTime={auction.endTime}
                auctionLink={urls.myAuctionDetail.replace(
                  ':auctionSlug',
                  auction.auctionId
                )}
              />
            ))}
          </Grid>
          <div className={css.paginationWrapper}>
            <Pagination
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              setPage={handlePageChange}
              total={totalAuctions}
            />
          </div>
        </>
      ) : (
        <NoAuctionsContent handleRedirect={handleNoAuctionRedirect} />
      )}
    </div>
  )
}
