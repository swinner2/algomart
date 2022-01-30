import clsx from 'clsx'
import { ReactNode } from 'react'

import common from './common-layout-styles.module.css'
import css from './my-profile-layout.module.css'

import AppFooter from '@/components/app-footer/app-footer'
import AppHeader from '@/components/app-header/app-header'
import HeadTag from '@/components/head-tag/head-tag'
import Heading from '@/components/heading'
import MainPanel from '@/components/main-panel/main-panel'
import EmailVerification from '@/components/profile/email-verification'
import LoadingStatus from '@/components/profile/loading-status'
import MyProfileNav from '@/components/profile/my-profile-nav'
import NotAuthenticated from '@/components/profile/not-authenticated'
import UntransferredPacks from '@/components/profile/untransferred-packs'
import { useAuth } from '@/contexts/auth-context'

export interface MyProfileLayoutProps {
  children?: ReactNode
  pageDescription?: string
  pageTitle: string
}

export default function MyProfileLayout({
  children,
  pageDescription,
  pageTitle,
}: MyProfileLayoutProps) {
  const { user, status } = useAuth()

  const isLoading = status === 'loading'
  const isAuthenticated = user?.username

  return (
    <>
      <HeadTag pageDescription={pageDescription} pageTitle={pageTitle} />

      <div className={common.background}>
        <section>
          <AppHeader />

          <MainPanel width="large" className="mx-auto max-w-7xl">
            <EmailVerification />
            <UntransferredPacks />
            {isLoading && <LoadingStatus />}
            {!isLoading && !isAuthenticated && <NotAuthenticated />}
            {!isLoading && isAuthenticated && (
              <>
                <MyProfileNav screen="mobile" />
                <Heading
                  level={1}
                  className={clsx(common.hideInMobile, common.pageTitle)}
                >
                  {pageTitle}
                </Heading>

                <div className="flex mx-4">
                  <section className="lg:w-80 lg:mr-32 md:mr-12 md:w-80 xs:mr-0 xs:w-0">
                    <MyProfileNav screen="desktop" />
                  </section>
                  <section className="w-full">{children}</section>
                </div>
              </>
            )}
          </MainPanel>
        </section>
      </div>
      <AppFooter />
    </>
  )
}
