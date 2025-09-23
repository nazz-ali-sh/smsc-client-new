export const leaseholderTypes = [
  { title: 'Converted House', image: '/svgs/house.svg', value: 'converted_house' },
  { title: 'Purpose built Flat', image: '/svgs/flat.svg', value: 'purpose_built_flats' },
  { title: 'Mixed Development', image: '/svgs/development.svg', value: 'mixed_development' },
  { title: 'Others', image: '/svgs/settings.svg', value: 'others' }
]

export const buildingTypes = [
  { title: 'Below 11m Typically 3 floors or less', value: 'below_11m', image: '/svgs/development.svg' },
  { title: '11m - 18m Typically 4 to 5 floors ', value: '11m_18m', image: '/svgs/fourFloor.svg' },
  { title: 'Above 18m Typically 6 floors or more ', value: 'above_18m', image: '/svgs/sixFloor.svg' },
  { title: "Don't Know", value: 'dont_know', image: '/svgs/settings2.svg' }
]

export const blockConditionTypes = [
  { title: 'Excellent', value: 'excellent', image: '/svgs/excellent.svg' },
  { title: 'Good', value: 'good', image: '/svgs/good.svg' },
  { title: 'Fair', value: 'fair', image: '/svgs/fair.svg' },
  { title: 'Poor', value: 'poor', image: '/svgs/poor.svg' }
]

export const outdoorSpaceTypes = [
  { title: 'Large Shared Space', value: 'large_shared_space', image: '/svgs/space.svg' },
  { title: 'Some', value: 'some', image: '/svgs/some.svg' },
  { title: 'None', value: 'none', image: '/svgs/none.svg' }
]

export const budgetFields = [
  { name: 'managing_fee', placeholder: 'Management Fee' },
  { name: 'accounting_fee', placeholder: 'Accounting Fee' },
  { name: 'cosec_fee', placeholder: 'CoSec Fee' },
  { name: 'out_of_hours_fee', placeholder: 'Out of Hours Fee' },
  { name: 'emergency_fee', placeholder: 'Emergency Fee' },
  { name: 'fire_door_fee', placeholder: 'Fire Door Fee' },
  { name: 'anti_money_fee', placeholder: 'Anti Money Laundering Fee' }
] as const

export const blockOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14+', value: '14' }
]

export const yearOptions = [
  { label: 'Pre 1900', value: 'pre_1900' },
  { label: '1900 - 1950', value: '1900_1950' },
  { label: '1951 - 2000', value: '1951_2000' },
  { label: '2001 - 2010', value: '2001_2010' },
  { label: '2011 - 2020', value: '2011_2020' },
  { label: '2021 - Present', value: '2021_2025' }
]

export const rtmSetupOptions = [
  { title: 'Yes', value: 'yes', image: '/svgs/thumbUp.svg' },
  { title: 'No', value: 'no', image: '/svgs/thumbDown.svg' }
]

export const rtmQuestions = [
  {
    id: 1,
    question: 'Are the blocks capable of independent redevelopment?',
    questionKey: 'q_independent_redevelopment' as const,
    nextRoute: '/rmc-onboarding-second',
    backRoute: '/rmc-onboarding-resident'
  },
  {
    id: 2,
    question: 'Can the blocks be separated from shared services?',
    questionKey: 'q_separable_shared_services' as const,
    nextRoute: '/rmc-onboarding-third',
    backRoute: '/rmc-onboarding-questions'
  },
  {
    id: 3,
    question: 'Are the units flats (not houses)?',
    questionKey: 'q_units_are_flats' as const,
    nextRoute: '/rmc-onboarding-four',
    backRoute: '/rmc-onboarding-second'
  },
  {
    id: 4,
    question: 'Are at least two-thirds of flats leasehold with leases over 21 years?',
    questionKey: 'q_two_thirds_leasehold_over_21_years' as const,
    nextRoute: '/rmc-onboarding-five',
    backRoute: '/rmc-onboarding-third'
  },
  {
    id: 5,
    question: 'Is the building at least 50% residential?',
    questionKey: 'q_at_least_50_percent_residential' as const,
    nextRoute: '/rmc-onboarding-rtm',
    backRoute: '/rmc-onboarding-four'
  }
] as const

export const tooltipContent = {
  block_name: {
    title: 'Block Name',
    content:
      "Enter the name you and other residents use to refer to your block — for example, if your address is 18 Chandlers Walk, the block name would be 'Chandlers Walk'."
  },
  no_of_units: {
    title: 'Number of Units',
    content:
      'Enter the total number of flats across the entire estate. Managing agents will base their quotes on this number.'
  },
  current_managing_agent: {
    title: 'Current Managing Agent',
    content: 'Enter the name of your current managing agent so we can ensure they are excluded from this tender.'
  }
}

export function getYearLabel(value?: string): string {
  const found = yearOptions?.find(option => option?.value === value)

  return found ? found?.label : ''
}
