import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'
import WeeklyReport from '@/common/WeeklyReport'
import ProjectListTable from '@/views/TenderInformations/ProjectListTable'
import RetenderNotification from '@/common/RetenderNotification'

export default function Page() {
  return (
    <>
      <RetenderNotification />
      <section className='flex w-full'>
        <WeeklyReport text={'Tender Results'} />
      </section>

      <div className='py-5'>
        <HorizontalLinearStepper />
      </div>
      <div>
        <ProjectListTable />
      </div>
    </>
  )
}
