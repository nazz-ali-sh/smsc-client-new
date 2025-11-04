'use client'

import { withPortalCheck } from '@/components/hoc/withPortalCheck'
import ArchivedTenders from '@/views/ArchivedTenders'
import PmaArchiveView from '@/views/ArchivedTenders/PmaArchiveView'

const PmaArchive = () => {
  return <PmaArchiveView />
}

const RmcArchive = () => {
  return <ArchivedTenders />
}

const ArchiveContent = withPortalCheck(PmaArchive, RmcArchive)

export default function Page() {
  return <ArchiveContent />
}
