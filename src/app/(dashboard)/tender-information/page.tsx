import HorizontalLinearStepper from '@/views/Dashboard/HorizontalLinearStepper'
import WeeklyReport from '@/common/WeeklyReport'
import ProjectListTable from '@/views/TenderInformations/ProjectListTable'

export default function Page() {
  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport text={'Tender Information'} dashboardResponce={undefined} />
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
