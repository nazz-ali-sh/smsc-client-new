import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'
import WeeklyReport from '@/common/WeeklyReport'
import ProjectListTable from '@/views/TenderInformations/ProjectListTable'

export default function Page() {
  return (
    <>
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
