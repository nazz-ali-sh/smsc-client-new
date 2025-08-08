import WeeklyReport from '@/common/WeeklyReport'
import TenderInformationView from '@/views/TenderInformationUpdated'

export default function Page() {
  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport dashboard={undefined} dashboardResponce={undefined} />
      </section>
      <TenderInformationView />
    </>
  )
}
