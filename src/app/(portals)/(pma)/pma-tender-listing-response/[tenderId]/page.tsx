import TenderDetailViewResponse from '@/views/PmaTenderListing/TenderDetailViewResponse'

const TenderDetailResponsePage = ({ params }: { params: { tenderId: string } }) => {
  return <TenderDetailViewResponse tenderId={Number(params.tenderId)} />
}

export default TenderDetailResponsePage
