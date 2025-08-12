import WeeklyReport from '@/common/WeeklyReport'
import TenderInformationView from '@/views/TenderInformationUpdated'

export default function Page() {
  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport text={'Welcome Back'} dashboardResponce={undefined} />
      </section>
      <TenderInformationView />
    </>
  )
}
