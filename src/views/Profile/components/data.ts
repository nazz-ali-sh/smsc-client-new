export type DataType = {
  id: number
  avatar: string
  fullName: string
  post: string
  email: string
  city: string
  start_date: string
  salary: number
  age: number
  experience: string
  status: number
  time: string
  Activity: string
}

const data: DataType[] = [
  {
    id: 1,
    avatar: '',
    fullName: "Korrie O'Crevy",
    post: 'Nuclear Power Engineer',
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    start_date: '09/23/2016',
    salary: 23896.35,
    age: 61,
    experience: '1 Year',
    status: 2,
    time: 'Video Call',
    Activity: 'Video Call'
  },
  {
    id: 7,
    avatar: '',
    fullName: 'Eileen Diehn',
    post: 'Environmental Specialist',
    email: 'ediehn6@163.com',
    city: 'Lampuyang',
    start_date: '10/15/2017',
    salary: 18991.67,
    age: 59,
    experience: '9 Years',
    status: 3,
    time: 'Video Call',
    Activity: 'Site Visit'
  },
  {
    id: 11,
    avatar: '',
    fullName: 'De Falloon',
    post: 'Sales Representative',
    email: 'dfalloona@ifeng.com',
    city: 'Colima',
    start_date: '06/12/2018',
    salary: 19252.12,
    age: 30,
    experience: '0 Year',
    status: 4,
    time: 'Video Call',
    Activity: 'Site Visit'
  },
  {
    id: 3,
    avatar: '',
    fullName: 'Stella Ganderton',
    post: 'Operator',
    email: 'sganderton2@tuttocitta.it',
    city: 'Golcowa',
    start_date: '03/24/2018',
    salary: 13076.28,
    age: 66,
    experience: '6 Years',
    status: 5,
    time: 'Video Call',
    Activity: 'Site Visit'
  },
  {
    id: 5,
    avatar: '',
    fullName: 'Harmonia Nisius',
    post: 'Senior Cost Accountant',
    email: 'hnisius4@gnu.org',
    city: 'Lucan',
    start_date: '08/25/2017',
    salary: 10909.52,
    age: 33,
    experience: '3 Years',
    status: 2,
    time: 'Video Call',
    Activity: 'Site Visit'
  }
]

export default data
