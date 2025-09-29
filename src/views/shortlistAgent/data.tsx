import Image from 'next/image'

import successVisit from '../../../public/images/customImages/sucess.svg'
import tradingYear from '../../../public/images/dashboardImages/tradingYear.svg'

// tradingYear

export const reviewSystem = [
  {
    id: 'strategisthub',
    title: 'StrategistHub',
    rating: 4,
    star: '',
    reviews: '98',
    websitLink: 'www.strategisthub.com',
    phone: '+1 (415) 800-4207',
    contact: 'contact@strategisthub.com',
    location: '5900 Balcones Drive, STE 4000 Austin TX, USA',
    pdf: 'data.pdf',
    companyImage: '/images/strategisthub.png'
  },
  {
    id: 'innovatex',
    title: 'InnovateX',
    rating: 5,
    star: '',
    reviews: '150',
    websitLink: 'www.innovatex.com',
    phone: '+1 (212) 555-1234',
    contact: 'info@innovatex.com',
    location: '123 Innovation Way, New York, NY, USA',
    pdf: 'data.pdf',
    companyImage: '/images/innovatex.png'
  },
  {
    id: 'TechSolutions',
    title: 'TechSolutions',
    rating: 3,
    star: '',
    reviews: '75',
    websitLink: 'www.techsolutions.com',
    phone: '+1 (310) 555-5678',
    contact: 'support@techsolutions.com',
    location: '789 Tech Blvd, Los Angeles, CA, USA',
    pdf: 'data.pdf',
    companyImage: '/images/techsolutions.png'
  },
  {
    title: 'CreativeMinds',
    rating: 4,
    star: '',
    reviews: '120',
    websitLink: 'www.creativeminds.com',
    phone: '+1 (617) 555-9012',
    contact: 'hello@creativeminds.com',
    location: '456 Creative St, Boston, MA, USA',
    pdf: 'data.pdf',
    companyImage: '/images/creativeminds.png'
  },
  {
    title: 'NextGen Labs',
    rating: 5,
    star: '',
    reviews: '200',
    websitLink: 'www.nextgenlabs.com',
    phone: '+1 (408) 555-3456',
    contact: 'contact@nextgenlabs.com',
    location: '321 Future Rd, San Jose, CA, USA',
    pdf: 'data.pdf',
    companyImage: '/images/nextgenlabs.png'
  }
]

export const tabs = [
  {
    id: 1,
    state: 'Quotation',
    icons: <i className='ri-customer-service-2-line'></i>,
    descrption: '$ 11,000'
  },
  {
    id: 4,
    icons: <Image src={successVisit} alt='success Visit' />,
    state: 'No. of Units Managed',
    descrption: '23 Properties'
  },

  {
    id: 2,
    icons: <Image src={tradingYear} alt='success Visit' />,
    state: 'Trading Years',
    descrption: '11 Years'
  }
]

export const cardsData = [
  {
    id: 0,
    state: '27',
    icons: <i className='ri-customer-service-2-line'></i>,
    descrption: 'Schedule Calls'
  },
  {
    id: 1,
    icons: <i className='ri-phone-line'></i>,
    state: '3',
    descrption: 'Complete Calls'
  },

  {
    id: 2,
    icons: <i className='ri-map-pin-2-line'></i>,
    state: '6',
    descrption: 'Schedule Visits'
  },

  {
    id: 3,
    icons: <Image src={successVisit} alt='success Visit' />,
    state: '10',
    descrption: 'Successful visits'
  }
]
