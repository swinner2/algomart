import {
  AuctionDetail,
  AuctionSortField,
  AuctionSortOptions,
  SortDirection,
} from '@algomart/schemas'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'

import Loading from '@/components/loading/loading'
import { SelectOption } from '@/components/select/select'
import { useAuth } from '@/contexts/auth-context'
import DefaultLayout from '@/layouts/default-layout'
import {
  getAuthenticatedUser,
  handleUnauthenticatedRedirect,
} from '@/services/api/auth-service'
import MyAuctionsTemplate from '@/templates/my-auctions-template'
import { getSelectSortingOptions } from '@/utils/filters'
import { urls } from '@/utils/urls'

export default function MyAuctionsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const selectOptions = getSelectSortingOptions(t)
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    selectOptions[0]
  )
  const [sortBy, setSortBy] = useState<AuctionSortField>(AuctionSortField.Title)
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Descending
  )

  // TODO: fetch auction list from API
  const auctions: AuctionDetail[] = [
    {
      auctionId: '1',
      image:
        'https://cms.algomart-og2d.seanwinner.com/assets/fad80f0d-45ab-4be2-88bc-f0304d9026de',
      title: 'Test title1',
      subtitle: 'Test subtitle1',
      body: 'Test body1',
      currentBidPrice: 100,
      endTime: `2022-03-28 12:20:35`,
      createdAt: `2022-03-28 12:20:35`,
    },
    {
      auctionId: '2',
      image:
        'https://cms.algomart-og2d.seanwinner.com/assets/fad80f0d-45ab-4be2-88bc-f0304d9026de',
      title: 'Test title2',
      subtitle: 'Test subtitle2',
      body: 'Test body2',
      currentBidPrice: 200,
      endTime: `2022-03-28 12:20:35`,
      createdAt: `2022-03-28 12:20:35`,
    },
    {
      auctionId: '3',
      image:
        'https://cms.algomart-og2d.seanwinner.com/assets/fad80f0d-45ab-4be2-88bc-f0304d9026de',
      title: 'Test title3',
      subtitle: 'Test subtitle3',
      body: 'Test body3',
      currentBidPrice: 300,
      endTime: `2022-03-28 12:20:35`,
      createdAt: `2022-03-28 12:20:35`,
    },
  ]
  const loading = false

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber)
  }, [])

  const handleSortChange = useCallback((option: SelectOption) => {
    setCurrentPage(1)
    setSelectedOption(option)
    let newSortBy = AuctionSortField.Title
    let newSortDirection = SortDirection.Ascending

    switch (option.id) {
      case AuctionSortOptions.Newest:
        newSortBy = AuctionSortField.CreatedAt
        newSortDirection = SortDirection.Descending
        break
      case AuctionSortOptions.Oldest:
        newSortBy = AuctionSortField.CreatedAt
        newSortDirection = SortDirection.Ascending
        break
      case AuctionSortOptions.Highest:
        newSortBy = AuctionSortField.CurrentBidPrice
        newSortDirection = SortDirection.Ascending
        break

      case AuctionSortOptions.Lowest:
        newSortBy = AuctionSortField.CurrentBidPrice
        newSortDirection = SortDirection.Ascending
        break
    }

    setSortBy(newSortBy)
    setSortDirection(newSortDirection)
  }, [])

  return (
    <DefaultLayout pageTitle={t('common:pageTitles.My Auctions')} width="large">
      {loading ? (
        <Loading />
      ) : (
        <MyAuctionsTemplate
          handleNoAuctionRedirect={() => router.push(urls.myCollectibles)}
          auctions={auctions}
          handleSortChange={handleSortChange}
          handlePageChange={handlePageChange}
          selectOptions={selectOptions}
          selectedOption={selectedOption}
          currentPage={currentPage}
          totalAuctions={auctions.length}
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

  return {
    props: {},
  }
}
