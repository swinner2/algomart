import {
  BidHistory,
  BidHistorySortableField,
  SortDirection,
} from '@algomart/schemas'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

import css from './index.module.css'

interface BidHistoryTableProps {
  bidHistory: BidHistory[]
  currentPage: number
  total: number
  sortedField?: BidHistorySortableField
  sortDirection?: SortDirection
  handlePageChange: (page: number) => void
  handleSortDirectionChange: (
    sortField: BidHistorySortableField,
    direction: SortDirection
  ) => void
}

export default function BidHistoryTable({
  bidHistory,
  currentPage,
  total,
  sortedField,
  sortDirection,
  handlePageChange,
  handleSortDirectionChange,
}: BidHistoryTableProps) {
  const perPage = 10
  const handleSortBy = (sortBy: BidHistorySortableField) => {
    if (sortedField === sortBy) {
      if (sortDirection === SortDirection.Ascending) {
        handleSortDirectionChange(sortBy, SortDirection.Descending)
      } else {
        handleSortDirectionChange(sortBy, SortDirection.Ascending)
      }
    } else {
      handleSortDirectionChange(sortBy, SortDirection.Descending)
    }
  }
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }
  const handleNext = () => {
    if (total > currentPage * perPage) {
      handlePageChange(currentPage + 1)
    }
  }
  return (
    <div className="bg-gray-500 bg-opacity-20 mx-auto text-white rounded-2xl px-4 py-2 w-full overflow-auto">
      <h2 className="flex justify-between items-center border border-b-1 border-l-0 border-r-0 border-t-0 border-gray-400 px-4 pb-3">
        <span className="text-white font-bold text-xl text-center">
          Bid history
        </span>
      </h2>
      <table className={css.table}>
        <thead>
          <tr>
            <th onClick={() => handleSortBy(BidHistorySortableField.Bidder)}>
              Name
              {sortedField === BidHistorySortableField.Bidder ? (
                sortDirection === SortDirection.Descending ? (
                  <span className={css.sortIcon}>▼</span>
                ) : (
                  <span className={css.sortIcon}>▲</span>
                )
              ) : null}
            </th>
            <th onClick={() => handleSortBy(BidHistorySortableField.Price)}>
              Amount
              {sortedField === BidHistorySortableField.Price ? (
                sortDirection === SortDirection.Descending ? (
                  <span className={css.sortIcon}>▼</span>
                ) : (
                  <span className={css.sortIcon}>▲</span>
                )
              ) : null}
            </th>
            <th onClick={() => handleSortBy(BidHistorySortableField.BidAt)}>
              Time
              {sortedField === BidHistorySortableField.BidAt ? (
                sortDirection === SortDirection.Descending ? (
                  <span className={css.sortIcon}>▼</span>
                ) : (
                  <span className={css.sortIcon}>▲</span>
                )
              ) : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {bidHistory.map((bid) => (
            <tr key={bid.bidId}>
              <td>{bid.bidder}</td>
              <td>{bid.price}</td>
              <td>{bid.bidAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 mb-2 px-4 flex justify-between">
        <div>
          <span className="text-blue-800 mr-2">Total:</span>
          {total}
        </div>
        {total > perPage && (
          <div className="flex align-center">
            <button
              className="rounded-xl bg-gray-200 bg-opacity-30 w-6 p-1"
              onClick={() => handlePrevious()}
            >
              <ChevronLeftIcon />
            </button>
            <span className="mx-2 font-md">{currentPage}</span>
            <button
              className="rounded-xl bg-gray-200 bg-opacity-30 w-6 p-1"
              onClick={() => handleNext()}
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
