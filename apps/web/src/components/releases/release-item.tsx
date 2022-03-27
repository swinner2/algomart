import { PackStatus, PackType, PublishedPack } from '@algomart/schemas'
import clsx from 'clsx'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import css from './release-item.module.css'

import AppLink from '@/components/app-link/app-link'
import Counter from '@/components/counter/counter'
import { useLocale } from '@/hooks/use-locale'
import { formatCurrency } from '@/utils/format-currency'
import { urls } from '@/utils/urls'

export interface ReleaseItemProps {
  pack: PublishedPack
}

export default function ReleaseItem({ pack }: ReleaseItemProps) {
  const locale = useLocale()
  const { t } = useTranslation()

  const reserveMet =
    pack.type === PackType.Auction &&
    pack?.activeBid &&
    pack.activeBid >= pack.price

  return (
    <div className={css.root}>
      <div className="my-0">
        <div
          className={clsx(
            css.imageWrapper,
            `w-full relative h-80 rounded-2xl overflow-hidden  border-1 border-gray-800`
          )}
        >
          <Image
            alt={pack.title}
            layout="fill"
            className="transition-all hover:opacity-80 object-cover lg:object-cover w-full h-full"
            src={pack.image}
          />
          <div className={css.subContent}>
            <div className="relative h-80 w-full flex items-center">
              {pack.status === PackStatus.Expired ? (
                <span
                  className={clsx(
                    css.status,
                    'uppercase absolute top-4 left-0 bg-red-600 rounded-xl font-bold px-2 py-1'
                  )}
                >
                  purchased!
                </span>
              ) : (
                <span
                  className={clsx(
                    css.status,
                    'uppercase absolute top-4 left-0 bg-blue-400 rounded-xl font-bold px-2 py-1'
                  )}
                >
                  purchasing!
                </span>
              )}
              <div>{pack.subtitle}</div>
              <div className="flex justify-center w-full absolute bottom-8">
                <AppLink href={urls.release.replace(':packSlug', pack.slug)}>
                  <span
                    className={clsx(
                      css.dropshadow,
                      'bg-gray-900 border-1 border-blue-800 text-md px-4 py-1 rounded-2xl flex items-center font-bold cursor-pointer'
                    )}
                  >
                    {pack.status === PackStatus.Expired
                      ? 'View details'
                      : 'Place a bid'}
                    <img
                      src="/images/icons/bid_btn_white.svg"
                      className="ml-2"
                    />
                  </span>
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata for active auction pack */}
      {pack.type === PackType.Auction && pack.status === PackStatus.Active && (
        <div className={css.metadata}>
          <div className="flex flex-col">
            <div className={css.metadataLabel}>
              {reserveMet
                ? t('release:Current Bid')
                : t('release:Reserve Price')}
            </div>
            <div className={css.metadataValue}>
              {reserveMet
                ? formatCurrency(pack.activeBid ?? 0, locale)
                : t('release:Not Met')}
            </div>
          </div>
          <div className="flex flex-col">
            <div className={css.metadataLabel}>{t('release:Ending In')}</div>
            <div className={css.metadataValue}>
              <Counter
                plainString
                target={new Date(pack.auctionUntil as string)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Metadata for expired auction pack */}
      {pack.type === PackType.Auction && pack.status === PackStatus.Expired && (
        <div className={css.metadata}>
          <div className="flex flex-col">
            <div className={css.metadataLabel}>
              {reserveMet
                ? t('release:Winning Bid')
                : t('release:Reserve Price')}
            </div>
            <div className={css.metadataValue}>
              {reserveMet
                ? formatCurrency(pack.activeBid ?? 0, locale)
                : t('release:Not Met')}
            </div>
          </div>
          <div className="flex flex-col">
            <div className={css.metadataLabel}>{t('release:Auction Has')}</div>
            <div className={css.metadataValue}>{t('release:Ended')}</div>
          </div>
        </div>
      )}

      {/* Metadata for upcoming auction pack */}
      {pack.type === PackType.Auction && pack.status === PackStatus.Upcoming && (
        <div className={clsx(css.metadata, css.full)}>
          <div className="flex flex-col">
            <div className={css.metadataLabel}>{t('release:Starting In')}</div>
            <div className={css.metadataValue}>
              <Counter
                plainString
                target={new Date(pack.releasedAt as string)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Metadata for purchasable pack */}
      {pack.type === PackType.Purchase && (
        // Purchase Data
        <div>
          <div className={clsx(css.metadata, css.full)}>
            <div className="flex flex-col">
              <div className={css.metadataLabel}>{pack.title}</div>
              <div className={css.metadataValue}>
                {formatCurrency(pack.price, locale)}
              </div>
            </div>
          </div>
          <div className="text-right mt-4 px-4">
            <span className="font-poppins text-sm text-blue-800">
              {t('release:N of N', {
                available: pack.available,
                total: pack.total,
              })}
              {t('release:Remaining')}
            </span>
          </div>
        </div>
      )}

      {/* Metadata for free pack */}
      {pack.type === PackType.Free && (
        <div className={clsx(css.metadata, css.full)}>
          <div className="flex flex-col">
            <div className={css.metadataLabel}>{pack.title}</div>
            <div className={css.metadataValue}>{t('common:statuses.Free')}</div>
          </div>
        </div>
      )}

      {/* Metadata for redeemable pack */}
      {pack.type === PackType.Redeem && (
        <div className={clsx(css.metadata, css.full)}>
          <div className="flex flex-col">
            <div className={css.metadataLabel}>{pack.title}</div>
            <div className={css.metadataValue}>
              {t('common:statuses.Redeemable')}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
