import RmcOnboardingFooter from '@/common/RmcOnboardingFooter'
import RmcOnboardingHeader from '@/common/RmcOnboardingHeader'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen mx-14'>
      <RmcOnboardingHeader />
      <main className='flex-1 overflow-y-auto w-full'>{children}</main>

      <RmcOnboardingFooter />
    </div>
  )
}
