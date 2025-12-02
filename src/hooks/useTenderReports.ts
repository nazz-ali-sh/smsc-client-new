import { useMutation } from '@tanstack/react-query'

import { downloadTenderReportPdf } from '@/services/tender_result-apis/tender-result-api'

export const useTenderReports = () => {
  const downloadBlindTenderMutation = useMutation({
    mutationFn: (tender_id: number) => downloadTenderReportPdf(tender_id, 'blind'),
    onSuccess: (blob: Blob, tender_id: number) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = `blind_tender_report_${tender_id}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    },
    onError: error => {
      console.error('Blind tender report download failed:', error)
    }
  })

  const viewBlindTenderMutation = useMutation({
    mutationFn: (tender_id: number) => downloadTenderReportPdf(tender_id, 'blind'),
    onSuccess: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob)

      window.open(url, '_blank')
      window.URL.revokeObjectURL(url)
    },
    onError: error => {
      console.error('Blind tender report view failed:', error)
    }
  })

  const downloadFinalReportMutation = useMutation({
    mutationFn: (tender_id: number) => downloadTenderReportPdf(tender_id, 'final_report'),
    onSuccess: (blob: Blob, tender_id: number) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = `final_tender_report_${tender_id}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    },
    onError: error => {
      console.error('Final report download failed:', error)
    }
  })

  return {
    downloadBlindTenderMutation,
    viewBlindTenderMutation,
    downloadFinalReportMutation
  }
}
