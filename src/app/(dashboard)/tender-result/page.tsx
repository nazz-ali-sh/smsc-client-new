import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'
import WeeklyReport from '@/common/WeeklyReport'
import ProjectListTable from '@/views/TenderInformations/ProjectListTable'

export default function Page() {
  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport text={'Tender Information'} />
      </section>
      <div className='my-[50px]'>
        <HorizontalLinearStepper />
      </div>
      <div>
        <ProjectListTable />
      </div>
    </>
  )
}
