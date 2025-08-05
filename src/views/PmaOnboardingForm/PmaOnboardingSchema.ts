import { object, string, boolean, union, literal, optional, pipe, minLength, email, number } from 'valibot'

export const businessProfileSchema = object({
  yearsTrading: optional(number('Enter how many years you have been trading')),
  totalUnits: optional(number('Enter the total number of units')),
  avgUnitsPerManager: optional(number('Enter the average number of units per manager'))
})

export const communicationPreferencesSchema = object({
  primaryContactNumber: optional(pipe(string('Primary contact number is required'))),
  secondaryContact: optional(
    object({
      fullName: optional(
        pipe(string('Full name is required'), minLength(2, 'Full name must be at least 2 characters'))
      ),
      email: optional(pipe(string('Email is required'), email('Must be a valid email address'))),
      phone: optional(pipe(string('Phone number is required'), minLength(10, 'Must be a valid phone number'))),
      preferredContact: optional(
        union([literal('Mobile'), literal('Landline')], 'Please select a preferred contact method')
      )
    })
  ),
  notificationRecipient: optional(
    union([literal('Primary'), literal('Secondary'), literal('Both')], 'Please select who should receive notifications')
  )
})

export const reviewsSchema = object({
  google: object({
    showOnReport: optional(boolean('Please indicate whether to show Google reviews')),
    averageRating: optional(string('Enter a valid Google rating')),
    numberOfReviews: optional(string('Enter a valid Google reviews count'))
  }),
  trustPilot: object({
    showOnReport: optional(boolean('Please indicate whether to show Trustpilot reviews')),
    averageRating: optional(string('Enter a valid Trustpilot rating')),
    numberOfReviews: optional(string('Enter a valid Trustpilot reviews count'))
  })
})

export const managementFeeSchema = object({
  minFee: optional(string('Enter a valid minimum fee')),
  maxFee: optional(string('Enter a valid maximum fee')),
  showFeesWithVat: optional(boolean('Please select VAT toggle'))
})

export const companyLogoSchema = object({
  logoFile: optional(object({})),
  logoUrl: optional(string())
})

export const companyBioSchema = object({
  bioText: optional(string('Company bio is required')),
  status: optional(union([literal('Approved'), literal('Pending Review'), literal('Flagged')], 'Select valid status')),
  previousBioText: optional(string())
})

export const branchLocationSchema = object({
  branchName: optional(string('Branch name is required')),
  fullAddress: optional(string('Full address is required')),
  lat: optional(string('Latitude is required')),
  lng: optional(string('Longitude is required')),
  contactName: optional(string('Contact name is required')),
  contactEmail: optional(pipe(string('Contact email is required'), email('Enter a valid contact email'))),
  contactPhone: optional(string('Contact phone is required')),
  useHeadOfficeContact: optional(boolean()),
  tenderRecipient: optional(
    union([literal('Branch Contact'), literal('Primary/Secondary User'), literal('Both')], 'Please select a recipient')
  )
})

export const branchLocationsSchema = object({
  branches: optional(branchLocationSchema)
})
