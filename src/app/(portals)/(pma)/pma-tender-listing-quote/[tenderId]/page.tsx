import TenderDetailViewQuote from '@/views/PmaTenderListing/TenderDetailViewQuote'

const TenderDetailQuotePage = ({ params }: { params: { tenderId: string } }) => {
  return <TenderDetailViewQuote tenderId={Number(params.tenderId)} />
}

export default TenderDetailQuotePage
