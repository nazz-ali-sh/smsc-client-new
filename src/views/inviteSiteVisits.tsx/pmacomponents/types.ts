export interface SiteVisitsModalProps {
  open: boolean
  setSiteVisitsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
  tenderID: string | number | null
  siteVisitDate: any
  types: string
  SideVisitsSchedualInviteId: number | undefined
}
