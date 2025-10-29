export const leaseholderTypes = [
  { title: 'Converted House', image: '/svgs/house.svg', value: 'converted_house' },
  { title: 'Purpose Built Flat', image: '/svgs/flat.svg', value: 'purpose_built_flats' },
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
  { name: 'managing_fee', label: 'Management Fee' },
  { name: 'accounting_fee', label: 'Accounting Fee' },
  { name: 'cosec_fee', label: 'CoSec Fee' },
  { name: 'out_of_hours_fee', label: 'Out of Hours Fee' },
  { name: 'emergency_fee', label: 'Emergency Fee' },
  { name: 'fire_door_fee', label: 'Fire Door Fee' },
  { name: 'anti_money_fee', label: 'Anti Money Laundering Fee' }
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
    nextRoute: '/second',
    backRoute: '/resident'
  },
  {
    id: 2,
    question: 'Can the blocks be separated from shared services?',
    questionKey: 'q_separable_shared_services' as const,
    nextRoute: '/third',
    backRoute: '/questions'
  },
  {
    id: 3,
    question: 'Are the units flats (not houses)?',
    questionKey: 'q_units_are_flats' as const,
    nextRoute: '/four',
    backRoute: '/second'
  },
  {
    id: 4,
    question: 'Are at least two-thirds of flats leasehold with leases over 21 years?',
    questionKey: 'q_two_thirds_leasehold_over_21_years' as const,
    nextRoute: '/five',
    backRoute: '/third'
  },
  {
    id: 5,
    question: 'Is the building at least 50% residential?',
    questionKey: 'q_at_least_50_percent_residential' as const,
    nextRoute: '/rtm',
    backRoute: '/four'
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

export function getOutdoorSpaceLabel(value?: string): string {
  const found = outdoorSpaceTypes?.find(option => option?.value === value)

  return found ? found?.title : ''
}

export function getLeaseholderTypeLabel(value?: string): string {
  const found = leaseholderTypes?.find(option => option?.value === value)

  return found ? found?.title : ''
}

export function getBlockConditionLabel(value?: string): string {
  const found = blockConditionTypes?.find(option => option?.value === value)

  return found ? found?.title : ''
}

export function getBuildingHeightLabel(value?: string): string {
  const found = buildingTypes?.find(option => option?.value === value)

  return found ? found?.title : ''
}

export const rmtFormInputs = [
  { name: 'name', label: 'Full Name', type: 'text' as const },
  { name: 'email', label: 'Email', type: 'email' as const },
  { name: 'phone_no', label: 'Phone Number', type: 'tel' as const }
]

export const rmcDirectorFormInputs = [
  { name: 'fullName', label: 'First Name', type: 'text' as const },
  { name: 'lastName', label: 'Last Name', type: 'text' as const },
  { name: 'email', label: 'Email', type: 'email' as const },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel' as const },
  { name: 'password', label: 'Password', type: 'password' as const, showPasswordToggle: true },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' as const, showPasswordToggle: true }
]

export const rmcContactDetailsInputs = [
  { name: 'companyWebsite', label: 'Company Website', type: 'text' as const },
  { name: 'companyLandlineNumber', label: 'Company Landline Number', type: 'tel' as const }
]

export const pmaOnboardingCompanyInputs = [
  { name: 'companyName', label: 'Company Name', type: 'text' as const },
  { name: 'website', label: 'Company Website', type: 'text' as const },
  { name: 'landline', label: 'Company Landline Number', type: 'tel' as const }
]

export const pmaOnboardingAccountInputs = [
  { name: 'fullName', label: 'First Name', type: 'text' as const },
  { name: 'lastName', label: 'Last Name', type: 'text' as const },
  { name: 'mobileNumber', label: 'Mobile Number', type: 'tel' as const },
  { name: 'email', label: 'Email', type: 'email' as const },
  { name: 'password', label: 'Password', type: 'password' as const, showPasswordToggle: true },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' as const, showPasswordToggle: true }
]

export const budgetText =
  "Including your block’s service charge budget is optional, but highly recommended. Tenders that include budget information typically receive more detailed and tailored replies from Managing Agents. If you'd prefer not to upload it, you can skip this step, but please note: once your tender goes live, you won’t be able to add budget details later. The fees you enter for each fee type will be applied to the full block."

export const recommandedStep = [
  {
    title: 'Initial Contact via Video Call:',
    description:
      'We recommend starting with a video call for a preliminary discussion. Use our meeting request form to ensure your invitation reaches them. Video calls help narrow down serious contenders before moving to in-person site visits.'
  },
  {
    title: 'Use Our Evaluation Matrix:',
    description:
      'Download and use our editable Evaluation Matrix to score each  agent objectively. This tool will help you assess their suitability  based on your block’s unique needs.'
  },
  {
    title: 'Site Visit Stage:',
    description:
      'After video calls, invite your top choices for a site visit. This will give them an opportunity to understand the property and allow you to see their approach firsthand.'
  },
  {
    title: 'Setting a Service Level Agreement (SLA):',
    description:
      'Remember to set clear service expectations by establishing an SLA prior to speaking with your shortlisted agents. This helps outline key performance indicators (KPIs) for the managing agent to work towards'
  }
]

export const consideration = [
  {
    title: 'Be Cautious with Online Reviews:',
    description:
      'Reviews may be biased or written by residents who don’t fully understand the financial constraints set by directors. Consider the context and duration the company has been operating to get a balanced view.'
  },
  {
    title: 'Select an Agent You Connect With:',
    description:
      'Do you prefer being a priority for a smaller agent or having the resources of a larger one, even if it means being less of a focus?'
  },
  {
    title: '',
    description:
      'After video calls, invite your top choices for a site visit. This will give them an opportunity to understand the property and allow you to see their approach firsthand.'
  },
  {
    title: '',
    description:
      'Remember, your goal is to find an agent who understands your needs and can deliver the level of service you expect, not just one with the flashiest sales pitch.'
  }
]

export const insuranceTypeOptions = [
  { label: 'Health Insurance', value: 'health' },
  { label: 'Life Insurance', value: 'life' },
  { label: 'Auto Insurance', value: 'auto' },
  { label: 'Property Insurance', value: 'property' },
  { label: 'Travel Insurance', value: 'travel' },
  { label: 'Other', value: 'other' }
]

export const planSelectionOptions = [
  { label: 'Basic Plan', value: 'basic' },
  { label: 'Standard Plan', value: 'standard' },
  { label: 'Premium Plan', value: 'premium' },
  { label: 'Deluxe Plan', value: 'deluxe' }
]

export const paymentMethodOptions = [
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'Debit Card', value: 'debit_card' },
  { label: 'Bank Transfer', value: 'bank_transfer' },
  { label: 'Cash', value: 'cash' },
  { label: 'Check', value: 'check' }
]

export const contactInfo = [
  {
    icon: 'ri-phone-line',
    text: '0800 690 6300'
  },
  {
    icon: 'ri-map-pin-line',
    text: '5, The Square, Bagshot, Surrey, GU19 5AX'
  },
  {
    icon: 'ri-mail-line',
    text: 'info@savemyservicecharge.co.uk'
  },
  {
    icon: 'ri-time-line',
    text: 'Mon - Fri 10:00 - 20:00'
  }
]

export const navigationLinks = [{ text: 'Terms' }, { text: 'Privacy' }, { text: 'Cookies' }]

export const socialMedia = [{ icon: 'ri-linkedin-fill' }, { icon: 'ri-facebook-fill' }]

export const setDaysOptions = [
  { value: '3', label: 'Up to 3 days' },
  { value: '5', label: 'Up to 5 days' }
]

export const setMilesOptions = [
  { value: '75', label: '75 miles' },
  { value: '100', label: '100 miles' }
]

export const steps = [
  {
    title: 'Shortlist Agents to Populate the Matrix',
    description: 'Once you shortlist agents, they will automatically appear in the evaluation matrix below.'
  },
  {
    title: 'Choose the Criteria You Want to Score Agents On',
    description:
      'You can edit the default list of criteria to reflect what matters most to your block. For example, "Responsiveness", "Service Charge Transparency", or "Reporting Tools". ',
    newDescription: 'Once you save your list of criteria, it cannot be changed'
  },
  {
    title: 'Understand How Weightings Work',
    description:
      'Each criterion can be weighted from 0.5 to 1.5 in 0.25 increments, allowing you to emphasize or de-emphasize its importance. For example, if "Communication" is very important, you could assign it a weight of 1.5. ',
    newDescription: 'The weighting is automatically applied to each score you enter ',
    secondDescription: '(e.g. a score of 8 with a 1.5 weighting will count as 12).'
  },
  {
    title: 'Scoring Each Managing Agent',
    description:
      'During your video calls and/or site visits, give each agent a score from 1 (poor) to 10 (excellent) for every criterion.'
  },
  {
    title: 'Collating Multiple Resident Views (If applicable)',
    description:
      'If multiple residents are attending the meetings, we recommend printing the blank matrix and asking each person to complete it individually.',
    newDescription:
      'You can then calculate an average score for each criterion and enter that into the portal (only one set of scores can be submitted per tender)'
  },
  {
    title: 'Save Your Matrix',
    description: "Once you've completed all scores, click Save Matrix.",
    newDescription:
      " These scores will be locked and cannot be changed, but they will appear in your Final Report once you've selected your managing agent."
  }
]

export const rmcRoutesWithoutSlash = [
  'postcode',
  'address',
  'details',
  'budget',
  'leaseholder',
  'buildings',
  'blocks',
  'spaces',
  'priorities',
  'open'
]

export const rmcRoutes = [
  '/onboarding',
  '/director',
  '/verification',
  '/otp',
  '/resident',
  '/rtm',
  '/questions',
  '/second',
  '/third',
  '/four',
  '/five',
  '/postcode',
  '/address',
  '/details',
  '/budget',
  '/leaseholder',
  '/buildings',
  '/blocks',
  '/spaces',
  '/priorities',
  '/open'
]

export const pmaRoutes = [
  '/director',
  '/pma-verification',
  '/pma-otp',
  '/otp-verification',
  '/verify-otp',
  '/company',
  '/company-details',
  '/business-profile',
  '/tenders-notification',
  '/email-notification',
  '/management',
  '/trustpilot-form',
  '/reviews-form',
  '/trustpilot-reviews',
  '/google-reviews',
  '/location',
  '/location-form',
  '/locationcode',
  '/pinlocation'
]

export const routesWithNavbarContent = rmcRoutesWithoutSlash

export const onboardingRoutes = [...rmcRoutes, '/tender-information']

export const links = [
  { href: '/calendar', label: 'Calendar' },
  { href: '/video-calls', label: 'Video Call' },
  { href: '/site-visits', label: 'Site Visit' }
]

export const companyBioPlaceholder =
  'Write a short, engaging introduction about your company’s approach and strengths. Do not include your company name, location, email address, or contact number — this is an anonymous stage of the process. Breaching these rules may result in your account being suspended. Focus on what makes you stand out and how you deliver value to residential blocks. This is the first thing RMCs will read before deciding who to shortlist.'

export const bioDetails = `"This is the first thing an RMC sees when you're shortlisted. Make it count: highlight your strengths,  your unique selling points, what you specialise in, and what makes you stand out from the rest. Think  about what an RMC would want in a partner and present it clearly and confidently."`

export const PMA_ROUTES = {
  COMPANY: '/company',
  OTP_VERIFICATION: '/otp-verification',
  VERIFY_OTP: '/verify-otp',
  LOCATIONCODE: '/locationcode',
  PINLOCATION: '/pinlocation',
  BUSINESS_PROFILE: '/business-profile',
  GOOGLE_REVIEWS: '/google-reviews',
  REVIEWS_FORM: '/reviews-form',
  TRUSTPILOT_REVIEWS: '/trustpilot-reviews',
  TRUSTPILOT_FORM: '/trustpilot-form',
  EMAIL_NOTIFICATION: '/email-notification',
  MANAGEMENT: '/management',
  COMPANY_DETAILS: '/company-details',
  LOCATION_FORM: '/location-form',
  TENDERS_NOTIFICATION: '/tenders-notification'
} as const

export const RMC_ROUTES = {
  ONBOARDING: '/onboarding',
  DIRECTOR: '/director',
  VERIFICATION: '/verification',
  OTP: '/otp',
  POSTCODE: '/postcode',
  ADDRESS: '/address',
  DETAILS: '/details',
  BUDGET: '/budget',
  LEASEHOLDER: '/leaseholder',
  BUILDINGS: '/buildings',
  BLOCKS: '/blocks',
  SPACES: '/spaces',
  PRIORITIES: '/priorities',
  OPEN: '/open',
  RESIDENT: '/resident',
  RTM: '/rtm',
  QUESTIONS: '/questions',
  SECOND: '/second',
  THIRD: '/third',
  FOUR: '/four',
  FIVE: '/five'
} as const

export const tenderTypeDetails = {
  went_live: {
    title: 'Live Tenders',
    description:
      'These are open tenders currently accepting submissions. You are eligible to respond if the block falls within your service radius. The tender remains live for 5 working days unless extended by the RMC.'
  },
  expired: {
    title: 'Expired Tenders',
    description:
      'You were eligible for this tender but did not submit a reply before the deadline. These entries are visible for 30 days before being removed from your archive. No further action is needed.'
  },
  shortlisted: {
    title: 'Shortlisted Tenders',
    description:
      'This is an overview of the tenders you’ve been shortlisted for. Please visit the Shortlisted page to view the RMC’s name and block address.Note: Once shortlisted, you gain visibility of the block, and a 3-day anonymity countdown begins before full contact details are released (unless a video call or site visit is booked sooner). Messaging is now unlocked and can be used to communicate directly with the RMC.'
  },
  closed: {
    title: 'Closed Tenders',
    description:
      'These are tenders you responded to but were not shortlisted for. The RMC has now appointed a different managing agent. Your submission is viewable here for 30 days following the appointment, for reference and review.'
  },
  not_appointed: {
    title: 'Not Appointed Tenders',
    description:
      'You were shortlisted and considered during the selection stage. RMC has chosen to appoint a different managing agent. These tenders will remain visible for 90 days. Your original submission and any feedback left by the RMC (if provided).'
  },
  date_registered: {
    title: 'Appointed Tenders',
    description:
      'These are the tenders where you’ve been successfully appointed as the managing agent. Keep track of key dates, documents, and next steps here.'
  },
  appointment: {
    title: 'Submitted Tenders',
    description:
      "These are tenders you've responded to, but the RMC has not shortlisted your company yet. Your submission is locked and cannot be edited. Tenders remain in this section until either:\n• You are shortlisted, or\n• The RMC appoints a new managing agent.\nPlease note: An RMC may initially shortlist other PMAs, conduct meetings, and later return to shortlist additional agents if needed. You remain eligible for shortlisting until the RMC makes a final appointment."
  }
}

export const tenderFilterMenuItems = [
  { value: 'went_live', label: 'Live Tenders' },
  { value: 'appointment', label: 'Submitted Tenders' },
  { value: 'expired', label: 'Expired Tenders' },
  { value: 'closed', label: 'Closed Tenders' },
  { value: 'not_appointed', label: 'Not Appointed Tenders' },
  { value: 'shortlisted', label: 'Shortlisted Tenders' },
  { value: 'date_registered', label: 'Won Tenders' }
]

export const getTenderDetails = (value: string) => {
  return tenderTypeDetails[value as keyof typeof tenderTypeDetails] || tenderTypeDetails.went_live
}
