import { CollectibleBase, PublishedPack } from '@algomart/schemas'
import clsx from 'clsx'
import useTranslation from 'next-translate/useTranslation'

import css from './home-template.module.css'

import AppLink from '@/components/app-link/app-link'
import NotableCollectible from '@/components/collectibles/collectible-notable'
import FeaturedPack from '@/components/featured-pack/featured-pack'
import Grid from '@/components/grid/grid'
import Heading from '@/components/heading'
import ReleaseItem from '@/components/releases/release-item'
import { urls } from '@/utils/urls'

export interface HomeTemplateProps {
  featuredPack: PublishedPack | undefined
  upcomingPacks: PublishedPack[]
  notableCollectibles: CollectibleBase[]
  onClickFeatured: () => void
}

const MarketingCardsSection = () => {
  const StepCard = ({
    icon,
    title,
    content,
    children,
  }: {
    icon: any
    title: any
    content: any
    children: any
  }) => {
    return (
      <div className="rounded-2xl border-2 border-gray-600 space-y-6 flex flex-col justify-between px-8 py-20 items-center">
        <div className="bg-blue-600 rounded-full w-12 h-12 p-2.5 text-center">
          <span className="text-gray-50 text-lg font-bold font-poppins">
            {icon}
          </span>
        </div>

        <span className="text-gray-50 text-lg font-bold font-poppins text-center">
          {title}
        </span>

        <span className="text-gray-50 text-sm font-poppins text-center">
          {content}
        </span>

        {children}
      </div>
    )
  }
  return (
    <div className="w-full mx-auto mt-24">
      <div className="relative sm:overflow-hidden">
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <span className="mt-6 mx-auto text-center text-sm inline-block w-full text-blue-400 font-bold font-poppins uppercase">
            Original 2 Digital
          </span>
          <h1 className="mt-6 text-center text-hero font-bold text-white sm:max-w-3xl mx-auto font-dm-sans">
            <span className="block">
              Take a step beyond the noise. We’re not your typical marketplace
              for every NFT.
            </span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-center text-2xl text-blue-400 sm:max-w-3xl font-dm-sans">
            OG2D was created to bring together excited, passionate, and die-hard
            creators and collectors to buy, sell, and trade 100% original,
            authenticated NFT collectibles in a safe and secure way.
          </p>

          <div className="mt-20">
            <div className="mt-12 max-w-6xl mx-auto grid gap-7 lg:grid-cols-3">
              <StepCard
                icon="01"
                title="Create an OG2D Account"
                content="Sign up and join the OG2D Community to start participating in our NFT Marketplace. Once your profile is created you can add your bio, connect your social media and more!"
              >
                {/* Should be a link */}
                <AppLink
                  href="/login"
                  key="/login"
                  className="text-blue-400 text-sm font-poppins"
                >
                  Signup here
                </AppLink>
              </StepCard>

              <StepCard
                icon="02"
                title="Search our Marketplace"
                content="Our marketplace consists of exclusive drops from artists, influencers and collectors from around the world. Unlock secrets, gifts and experiences in every purchase."
              >
                {/* Should be a link */}
                <AppLink
                  href="/releases"
                  className="text-blue-400 text-sm font-poppins"
                  key="/releases"
                >
                  Start searching
                </AppLink>
              </StepCard>

              <StepCard
                icon="03"
                title="Enjoy your NFT"
                content="Congrats! Once you have successfully purchased your NFT it will appear in your email and your user profile to view, share and even send to other OG2D users."
              >
                {/* Should be a link */}
                <AppLink
                  href="/my/collectibles"
                  key="/my/collectibles"
                  className="text-blue-400 text-sm font-poppins"
                >
                  View your NFTs
                </AppLink>
              </StepCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function HomeTemplate({
  featuredPack,
  upcomingPacks,
  notableCollectibles,
  onClickFeatured,
}: HomeTemplateProps) {
  const { t } = useTranslation()

  return (
    <>
      {featuredPack ? (
        <FeaturedPack
          featuredPack={featuredPack}
          onClickFeatured={onClickFeatured}
        />
      ) : null}

      {upcomingPacks.length > 0 ? (
        <>
          <div className={clsx('mx-auto max-w-7xl', css.upcomingPacks)}>
            <Heading level={2} size={1} bold className={css.sectionTitle}>
              {t('release:Active & Upcoming Drops')}
            </Heading>

            <div className="grid gap-7 lg:grid-cols-4">
              {' '}
              {upcomingPacks.map((pack) => (
                <AppLink
                  key={pack.templateId}
                  href={urls.release.replace(':packSlug', pack.slug)}
                >
                  <ReleaseItem pack={pack} />
                </AppLink>
              ))}
            </div>
            <MarketingCardsSection />
          </div>
        </>
      ) : null}

      {notableCollectibles.length > 0 ? (
        <>
          <Heading level={2} size={1} bold className={css.sectionTitle}>
            {t('release:Notable Collectibles')}
          </Heading>

          <div className={clsx('mx-auto max-w-7xl', css.notableCollectibles)}>
            {/* Steps cards */}
            <Grid columns={4}>
              {notableCollectibles.map((collectible) => (
                <NotableCollectible
                  collectible={collectible}
                  key={collectible.templateId}
                />
              ))}
            </Grid>
          </div>
        </>
      ) : null}
    </>
  )
}
