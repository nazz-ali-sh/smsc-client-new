import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'
import WeeklyReport from '@/common/WeeklyReport'
import ProjectListTable from '@/views/TenderInformations/ProjectListTable'
import RetenderNotification from '@/common/RetenderNotification'

export default function Page() {
  return (
    <>
      <RetenderNotification
        title='Not getting enough replies?'
        description="We've noticed this tender has received fewer than 3 responses. To increase your chances of success, you can re-tender Your Block."
        buttonText='Re-Tender'
        showModal={true}
        tenderId='TND-xxxx'
        icon='📢'
      />
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
