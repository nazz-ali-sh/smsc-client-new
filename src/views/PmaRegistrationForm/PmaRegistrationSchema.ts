import { object, string, pipe, nonEmpty, email, minLength, check } from 'valibot'

export const accountInfoSchema = object({
  companyName: pipe(string(), nonEmpty('Company name is required')),
  fullName: pipe(string(), nonEmpty('Full name is required')),
  email: pipe(
    string(),
    nonEmpty('Email is required'),
    email('Invalid email format'),
    check((value: string) => {
      const domain = value.split('@')[1]?.toLowerCase()
      const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']

      return !!domain && !freeDomains.includes(domain)
    }, 'Please use your company email address')
  ),
  mobileNumber: pipe(
    string(),
    nonEmpty('Mobile number is required'),
    minLength(10, 'Mobile number must be at least 10 digits')
  ),
  password: pipe(
    string(),
    nonEmpty('Password is required'),
    minLength(8, 'Password must be at least 8 characters'),
    check(value => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
    check(value => /[0-9]/.test(value), 'Password must contain at least one number')
  ),
  confirmPassword: pipe(string(), nonEmpty('Please confirm your password'))
})

export const validatedAccountInfoSchema = pipe(
  accountInfoSchema,
  check(input => input.password === input.confirmPassword, 'Passwords do not match')
)

export const businessInfoSchema = object({
  address: pipe(string(), nonEmpty('Address is required')),
  website: pipe(string(), nonEmpty('Website is required')),
  landline: pipe(string(), nonEmpty('Landline is required')),
  coordinates: object({
    lat: pipe(string(), nonEmpty('Location must be confirmed on map')),
    lng: pipe(string(), nonEmpty('Location must be confirmed on map'))
  })
})
