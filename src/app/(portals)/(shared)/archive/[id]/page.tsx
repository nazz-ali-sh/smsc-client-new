'use client'

import { withPortalCheck } from '@/components/hoc/withPortalCheck'
import PmaArchiveDetailView from '@/views/ArchivedTenders/PmaArchiveDetailView'
import RmcArchiveDetailView from '@/views/ArchivedTenders/RmcArchiveDetailView'

interface PageProps {
  params: {
    id: string
  }
}

const PmaArchiveDetail = () => {
  return <PmaArchiveDetailView />
}

const RmcArchiveDetail = ({ params }: PageProps) => {
  return <RmcArchiveDetailView params={params} />
}

const ArchiveDetailContent = withPortalCheck(PmaArchiveDetail, RmcArchiveDetail)

export default ArchiveDetailContent
