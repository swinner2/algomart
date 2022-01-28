import { Static, Type } from '@sinclair/typebox'

import { Simplify } from './shared'

export type SecondaryAuctionFormStatus =
  | 'passphrase'
  | 'form'
  | 'loading'
  | 'success'
  | 'error'

const AuctionDetailSchema = Type.Object({
  auctionId: Type.String(),
  image: Type.String(),
  title: Type.String(),
  subtitle: Type.String(),
  body: Type.String(),
  currentBidPrice: Type.Optional(Type.Number()),
  endTime: Type.String(),
  createdAt: Type.String(),
})

const BidHistorySchema = Type.Object({
  bidId: Type.String(),
  bidder: Type.String(),
  price: Type.Number(),
  bidAt: Type.String(),
})

export enum BidHistorySortableField {
  BidId = 'bidId',
  Bidder = 'bidder',
  Price = 'price',
  BidAt = 'bidAt',
}

export enum AuctionSortField {
  Title = 'title',
  CreatedAt = 'createdAt',
  CurrentBidPrice = 'currentBidPrice',
}

export enum AuctionSortOptions {
  Name = 'Name',
  Newest = 'Newest',
  Oldest = 'Oldest',
  Highest = 'Highest',
  Lowest = 'Lowest',
}

export type AuctionDetail = Simplify<Static<typeof AuctionDetailSchema>>
export type BidHistory = Simplify<Static<typeof BidHistorySchema>>
