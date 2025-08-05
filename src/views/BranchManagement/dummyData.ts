import type { BranchType, UserType } from './types'

const mobilePrefixes = ['074', '075', '077', '078', '079']

const generateUKMobileNumber = () => {
  const prefix = mobilePrefixes[Math.floor(Math.random() * mobilePrefixes.length)]

  const number = Math.floor(1000000 + Math.random() * 8999999)
    .toString()
    .padStart(7, '0')

  return `+44${prefix}${number}`
}

export const dummyBranches: BranchType[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  company_id: Math.floor(1 + Math.random() * 5),
  user_id: Math.floor(1 + Math.random() * 10),
  branch_name: `Branch ${i + 1}`,
  address: `Street ${i + 1}, City`,
  postcode: `100${i + 1}`,
  lat: (51.5074 + Math.random() * 0.01).toFixed(6),
  lng: (-0.1278 + Math.random() * 0.01).toFixed(6),
  contact_name: `Contact ${i + 1}`,
  contact_email: `contact${i + 1}@branch.com`,
  contact_phone: generateUKMobileNumber(),
  status: Math.random() > 0.5 ? 'active' : 'inactive'
}))

export const dummyUsers: UserType[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  mobile_number: generateUKMobileNumber()
}))
