import { CollectibleWithDetails } from '@algomart/schemas'
import useTranslation from 'next-translate/useTranslation'

import CollectibleBrowserDialog from '@/components/collectibles/collectible-browser-dialog'
import CollectibleItem from '@/components/collectibles/collectible-item'
import NoCollectiblesContent from '@/components/collectibles/no-collectibles-content'
import Grid from '@/components/grid/grid'
import Pagination, { PAGE_SIZE } from '@/components/pagination/pagination'
import Select, { SelectOption } from '@/components/select/select'
import Tabs from '@/components/tabs/tabs'
import { useAuth } from '@/contexts/auth-context'
import {
  collectibleIsNumberOfDaysOld,
  getCollectionTabs,
} from '@/utils/collections'

// export interface MyCollectiblesTemplateProps {
// }

export default function MyCollectiblesAuctionTemplate() {
  const { t } = useTranslation()
  const auth = useAuth()

  return <div className="mx-auto max-w-7xl mt-10"></div>
}
