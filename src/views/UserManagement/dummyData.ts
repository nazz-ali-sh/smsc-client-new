const mobilePrefixes = ['074', '075', '077', '078', '079']

const generateUKMobileNumber = () => {
  const prefix = mobilePrefixes[Math.floor(Math.random() * mobilePrefixes.length)]

  const number = Math.floor(1000000 + Math.random() * 8999999)
    .toString()
    .padStart(7, '0')

  return `+44${prefix}${number}`
}

export const dummyUsers: any[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  mobile_number: generateUKMobileNumber(),
  status: i % 2 === 0 ? 'active' : 'inactive'
}))
