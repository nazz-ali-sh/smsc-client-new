import TenderDetailView from '@/views/PmaTenderListing/TenderDetailView'

const PmaTenderDetailPage = ({ params }: { params: { tenderId: string } }) => {
  const tenderId = parseInt(params.tenderId, 10)

  return <TenderDetailView tenderId={tenderId} />
}

export default PmaTenderDetailPage
