import useTranslation from 'next-translate/useTranslation'
import Tabs from '@/components/tabs/tabs'
import { getCollectionTabs } from '@/utils/collections'

export default function MyAuctionsTemplate() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-7xl mt-10">
      {/* Tabs */}
      <Tabs activeTab={3} tabs={getCollectionTabs(t)} negativeMargin />
      <span className="text-white">test</span>
    </div>
  )
}
