import managementFee from '../../public/images/tenderShortlisted/managemnetFees.svg'
import acountingFee from '../../public/images/tenderShortlisted/acountingFee.svg'
import coFee from '../../public/images/tenderShortlisted/coFee.svg'
import clock from '../../public/images/tenderShortlisted/clock.svg'
import emergency from '../../public/images/tenderShortlisted/emergencyfee.svg'
import fireDoor from '../../public/images/tenderShortlisted/fireDoor.svg'
import amlcheck from '../../public/images/tenderShortlisted/amlChecks.svg'
import total from '../../public/images/tenderShortlisted/total.svg'

import locationsIcons from '../../public/images/archiveImages/locationIcon.svg'
import blocks from '../../public/images/archiveImages/blocks.svg'
import blockCondations from '../../public/images/archiveImages/blockCondation.svg'
import outdoorspace from '../../public/images/archiveImages/outdoorspace.svg'
import unitCounts from '../../public/images/archiveImages/unitsCount.svg'
import buildingHeight from '../../public/images/archiveImages/buildiungHeight.svg'

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

export const iconMaps: any = {
  location: locationsIcons,
  units_count: unitCounts,
  number_of_blocks: blocks,
  outdoor_space: outdoorspace,
  year_built: emergency,
  block_condition: blockCondations,
  building_height: buildingHeight,
  product_type: buildingHeight
}
