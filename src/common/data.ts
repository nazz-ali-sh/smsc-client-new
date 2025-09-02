import managementFee from '../../public/images/tenderShortlisted/managemnetFees.svg'
import acountingFee from '../../public/images/tenderShortlisted/acountingFee.svg'
import coFee from '../../public/images/tenderShortlisted/coFee.svg'
import clock from '../../public/images/tenderShortlisted/clock.svg'
import emergency from '../../public/images/tenderShortlisted/emergencyfee.svg'
import fireDoor from '../../public/images/tenderShortlisted/fireDoor.svg'
import amlcheck from '../../public/images/tenderShortlisted/amlChecks.svg'
import total from '../../public/images/tenderShortlisted/total.svg'

export const daysWithSlots = [
  { id: 1, day: 'Monday' },
  { id: 2, day: 'Tuesday' },
  { id: 3, day: 'Wednesday' },
  { id: 4, day: 'Thursday' },
  { id: 5, day: 'Friday' }
]

export const iconMap: any = {
  management_fee: managementFee,
  accounting_fee: acountingFee,
  cosec_fee: coFee,
  out_of_hours_fee: clock,
  emergency_lighting_fee: emergency,
  fire_door_inspection: fireDoor,
  aml_checks: amlcheck,
  total: total
}
