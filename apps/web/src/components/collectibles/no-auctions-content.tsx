import useTranslation from 'next-translate/useTranslation'

import Button from '@/components/button'
import Heading from '@/components/heading'

export interface NoAuctionsContentProps {
  handleRedirect(): void
}

export default function NoAuctionsContent({
  handleRedirect,
}: NoAuctionsContentProps) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center">
      <Heading
        className="text-gray-200 text-3xl mb-8 font-bold my-12"
        level={3}
      >
        No auctions
      </Heading>
      <Heading className="text-blue-800 font-bold my-12" level={3}>
        {t('auction:viewer.createAuction')}
      </Heading>
      <Button onClick={handleRedirect} className="mx-20 w-80 mb-12">
        {t('auction:viewer.goToNFTs')}
      </Button>
    </div>
  )
}
