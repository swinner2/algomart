import { Translate } from 'next-translate'
import { date, object, oneOf, required, string } from 'validator-fns'

// Fields
const auctionType = (t: Translate) =>
  string(
    required(t('forms:errors.required') as string),
    oneOf(['purchase', 'auction'], t('forms:errors.required') as string)
  )

const reservePrice = (t: Translate) =>
  string(required(t('forms:errors.required') as string))

const expiresAt = (t: Translate) =>
  date(required(t('forms:errors.required') as string))

const collectibleId = (t: Translate) =>
  string(required(t('forms:errors.required') as string))

const royalty = (t: Translate) =>
  string(required(t('forms:errors.required') as string))

// Forms
export const validateSecondaryAuctionForm = (t: Translate) =>
  object({
    reservePrice: reservePrice(t),
    auctionType: auctionType(t),
    expiresAt: expiresAt(t),
    collectibleId: collectibleId(t),
    royalty: royalty(t),
  })
