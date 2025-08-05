import {
  object,
  string,
  number,
  pipe,
  nonEmpty,
  minLength,
  email,
  check,
  forward,
  optional,
  transform,
  minValue
} from 'valibot'

// Validation Schemas
export const aboutYouSchema = object({
  role: pipe(string(), nonEmpty('Role is required')),
  rmcNumber: optional(string(), 'We’ll need to confirm your company details before launching your tender'),
  leaseholdType: pipe(string(), nonEmpty('Leasehold Type is required')),
  blockCondition: pipe(string(), nonEmpty('Block Condition is required')),
  outdoorSpace: pipe(string(), nonEmpty('Outdoor Space is required')),
  nonLeaseholder: optional(string(), ''),
  rtmRole: optional(number(), 0),
  leaseholdTypeOtherDetails: optional(string(), '')
})

export const locationSchema = object({
  address: string('Address is required.'),
  postcode: string('post code is required.'),
  coordinates: object({
    lat: string(),
    lng: string()
  }),
  city: optional(string()), 
  state: optional(string())
})

export const blockDetailsSchema = object({
  numberOfBlocks: pipe(string(), transform(Number), minValue(1, 'Must be at least 1')),
  totalUnits: pipe(string(), transform(Number), minValue(0, 'Must be 0 or greater')),
  yearBuilt: optional(string(), ''),
  serviceChargeBudget: pipe(string(), transform(Number), minValue(0, 'Must be 0 or greater')),
  budgetToggle: pipe(string(), nonEmpty('Budget type is required')),
  currentManagementFee: pipe(string(), transform(Number), minValue(0, 'Must be 0 or greater')),
  feeToggle: pipe(string(), nonEmpty('Fee type is required'))
})

export const tenderDetailsSchema = pipe(
  object({
    fullName: pipe(string(), nonEmpty('Full Name is required')),
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
    mobile: pipe(string(), nonEmpty('Mobile is required'), minLength(10, 'Mobile must be at least 10 digits')),
    password: pipe(string(), nonEmpty('Password is required'), minLength(8, 'Password must be at least 8 characters')),
    confirmPassword: pipe(string(), nonEmpty('Confirm Password is required')),
    address: optional(string(), ''),
    blockName: optional(string(), ''),
    currentManagingAgent: optional(string(), ''),
    verificationMethod: pipe(string(), nonEmpty('Verification Method is required'))
  }),
  forward(
    check(input => input.password === input.confirmPassword, 'Passwords do not match.'),
    ['confirmPassword']
  )
)
