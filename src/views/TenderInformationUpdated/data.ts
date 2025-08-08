export interface tenderInformationData {
  id: string
  name: string
  pmaId: string
  profileImage: string
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  propertyDetails: {
    region: string
    unitCount: number
    blockCount: number
    yearBuilt: number
    blockCondition: string
    outdoorSpace: boolean
    productType: string
  }
  priorities: Array<{
    id: number
    title: string
    description: string
  }>
  painPoints: Array<{
    id: number
    question: string
    placeholder: string
  }>
  siteVisits: Array<{
    id: string
    meetingWith: string
    date: string
    time: string
    location: string
    fullAddress: string
  }>
}

export const tenderInformationData: tenderInformationData = {
  id: 'RMC1XXXXX',
  name: 'Block Details',
  pmaId: '12312456',
  profileImage: '/images/customImages/company.png',
  contactInfo: {
    email: 'Debra.holt@example.com',
    phone: '(215) 555-0114 (Primary)',
    address: '417 Washington Ave, Manchester, Kentucky 35435'
  },
  propertyDetails: {
    region: 'SW London',
    unitCount: 38,
    blockCount: 2,
    yearBuilt: 2005,
    blockCondition: 'Well Maintained',
    outdoorSpace: true,
    productType: 'Modern Purpose Build'
  },
  priorities: [
    {
      id: 1,
      title: 'Saving Money',
      description: 'I want to reduce my service charges and get better value for money.'
    },
    {
      id: 2,
      title: 'Clearer Communication',
      description: 'I want regular updates and quicker replies from my managing agent.'
    },
    {
      id: 3,
      title: 'Better Problem Solving',
      description: 'I want maintenance and issues dealt with swiftly and properly.'
    },
    {
      id: 4,
      title: 'Being Involved',
      description: 'I want to be consulted on important decisions about our building.'
    },
    {
      id: 5,
      title: 'Higher Standards',
      description: 'I want a professional, consistent service that reflects pride in the block.'
    },
    {
      id: 6,
      title: 'Higher Standards',
      description: 'I want a professional, consistent service that reflects pride in the block.'
    },
    {
      id: 7,
      title: 'Clearer Financial Reporting',
      description: "I want easy to understand budgets and breakdowns of what we're paying for."
    }
  ],
  painPoints: [
    {
      id: 1,
      question: 'What would you like to see done differently by a new managing agent?',
      placeholder: 'Enter your response...'
    },
    {
      id: 2,
      question:
        'Are there any systems, tools, or financial reporting features that would improve how your block is managed?',
      placeholder: 'Enter your response...'
    },
    {
      id: 3,
      question: 'What service challenges have you experienced with your current managing agent?',
      placeholder: 'Enter your response...'
    }
  ],
  siteVisits: [
    {
      id: '1',
      meetingWith: 'PMA - 12315506',
      date: 'Monday 25th June 2025',
      time: '11:00 AM',
      location: '123 Main Street, Apt 48 Anytown, State 12345 United States',
      fullAddress: '123 Main Street Apt 48 Anytown, State 12345, London'
    }
  ]
}
