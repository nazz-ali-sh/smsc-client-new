import RmcOnboardingFooter from '@/common/RmcOnboardingFooter'
import ConditionalOnboardingHeader from '@/components/layout/horizontal/ConditionalOnboardingHeader'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <ConditionalOnboardingHeader />
      <main className='flex-1 overflow-y-auto w-full'>{children}</main>

      <RmcOnboardingFooter />
    </div>
  )
}
