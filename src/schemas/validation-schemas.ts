import {
  object,
  string,
  pipe,
  nonEmpty,
  email,
  minLength,
  check,
  forward,
  maxLength,
  regex,
  optional,
  boolean,
  number
} from 'valibot'

export const validateUKPhoneNumber = (value: string): boolean => {
  if (!/^\+?\d+$/.test(value)) {
    return false
  }

  const cleanNumber = value.replace(/\s+/g, '')

  if (/^\+44\d{9,10}$/.test(cleanNumber)) {
    return true
  }

  if (/^\d{7,10}$/.test(cleanNumber)) {
    return true
  }

  if (/^07\d{9}$/.test(cleanNumber)) {
    return true
  }

  if (/^0[123]\d{8,9}$/.test(cleanNumber)) {
    return true
  }

  return false
}

const validateUKLandlineNumber = (value: string): boolean => {
  const cleanNumber = value.replace(/\s+/g, '')

  if (/^\+44[12]\d{9,10}$/.test(cleanNumber)) {
    return true
  }

  if (/^0[12]\d{8,9}$/.test(cleanNumber)) {
    return true
  }

  return false
}

const validateWebsiteURL = (value: string): boolean => {
  try {
    const urlToTest = value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`

    const url = new URL(urlToTest)

    return url.hostname.includes('.') && url.hostname.length > 3
  } catch {
    return false
  }
}

export const directorOfRMCSchema = pipe(
  object({
    fullName: pipe(
      string(),
      nonEmpty('Full Name is required'),
      minLength(2, 'Full Name must be at least 2 characters'),
      check((value: string) => value.length <= 15, 'Full Name cannot exceed 15 characters'),
      check(
        (value: string) => /^[a-zA-Z\s'-]+$/.test(value.trim()),
        'Full Name can only contain letters, spaces, hyphens, and apostrophes'
      ),
      check((value: string) => !/^\s|\s$/.test(value), 'Full Name cannot start or end with spaces'),
      check((value: string) => !/\d/.test(value), 'Full Name cannot contain numbers'),
      check(
        (value: string) => !/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/.test(value),
        'Full Name cannot contain special characters'
      )
    ),
    lastName: pipe(
      string(),
      nonEmpty('Last name is required'),
      minLength(2, 'Last name must be at least 2 characters'),
      check((value: string) => value.length <= 15, 'Last name cannot exceed 15 characters'),
      check(
        (value: string) => /^[a-zA-Z\s'-]+$/.test(value.trim()),
        'Last name can only contain letters, spaces, hyphens, and apostrophes'
      ),
      check((value: string) => !/^\s|\s$/.test(value), 'Last name cannot start or end with spaces'),
      check((value: string) => !/\d/.test(value), 'Last name cannot contain numbers'),
      check(
        (value: string) => !/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/.test(value),
        'Last name cannot contain special characters'
      )
    ),
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
    phoneNumber: pipe(
      string(),
      nonEmpty('Phone number is required'),
      check(validateUKPhoneNumber, 'Please enter a valid UK phone number (e.g., 07123456789 )')
    ),
    password: pipe(
      string(),
      nonEmpty('Password is required'),
      minLength(8, 'Password must be at least 8 characters'),
      check((value: string) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
      check((value: string) => /[a-z]/.test(value), 'Password must contain at least one lowercase letter'),
      check((value: string) => /[0-9]/.test(value), 'Password must contain at least one number'),
      check((value: string) => /[^A-Za-z0-9]/.test(value), 'Password must contain at least one special character')
    ),
    confirmPassword: pipe(string(), nonEmpty('Please confirm your password'))
  }),
  forward(
    check(input => input.password === input.confirmPassword, 'Passwords do not match'),
    ['confirmPassword']
  )
)

export const postcodeSchema = pipe(
  object({
    postcode: pipe(
      string(),
      nonEmpty('Postcode is required'),
      minLength(5, 'Postcode must be at least 5 characters'),
      check(
        (value: string) =>
          /^[A-Z]{1,2}[0-9R][0-9A-Z]?[ ]?[0-9][A-Z]{2}$/i.test(value.trim()) ||
          /^[A-Z]{1,2}[0-9R][0-9A-Z]{2}$/i.test(value.trim()),
        'Please enter a valid UK postcode'
      )
    )
  })
)

export const commonValidationSchemas = {
  requiredString: (fieldName: string) => pipe(string(), nonEmpty(`${fieldName} is required`)),

  email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),

  phoneNumber: pipe(
    string(),
    nonEmpty('Phone number is required'),
    minLength(8, 'Phone number must be at least 8 digits'),
    check(
      (value: string) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, '')),
      'Please enter a valid phone number'
    )
  ),

  strongPassword: pipe(
    string(),
    nonEmpty('Password is required'),
    minLength(8, 'Password must be at least 8 characters'),
    check((value: string) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
    check((value: string) => /[a-z]/.test(value), 'Password must contain at least one lowercase letter'),
    check((value: string) => /[0-9]/.test(value), 'Password must contain at least one number'),
    check((value: string) => /[^A-Za-z0-9]/.test(value), 'Password must contain at least one special character')
  ),

  postcode: pipe(
    string(),
    nonEmpty('Postcode is required'),
    minLength(5, 'Postcode must be at least 5 characters'),
    check(
      (value: string) =>
        /^[A-Z]{1,2}[0-9R][0-9A-Z]?[ ]?[0-9][A-Z]{2}$/i.test(value.trim()) ||
        /^[A-Z]{1,2}[0-9R][0-9A-Z]{2}$/i.test(value.trim()),
      'Please enter a valid UK postcode'
    )
  ),

  numberField: (fieldName: string) =>
    pipe(
      string(),
      nonEmpty(`${fieldName} is required`),
      check((value: string) => /^\d+(\.\d{1,2})?$/.test(value.trim()), `${fieldName} must be a valid number`)
    )
}

export const budgetSchema = pipe(
  object({
    managing_fee: optional(
      pipe(
        string(),
        check(
          (value: string) => value.trim() === '' || /^\d+(\.\d{1,2})?$/.test(value.trim()),
          'Management Fee must be a valid number'
        ),
        check((value: string) => {
          if (value.trim() === '') return true
          const numValue = parseFloat(value.trim())

          return numValue <= 9999
        }, 'Management Fee cannot exceed 9999')
      )
    ),
    accounting_fee: optional(
      pipe(
        string(),
        check(
          (value: string) => value.trim() === '' || /^\d+(\.\d{1,2})?$/.test(value.trim()),
          'Accounting Fee must be a valid number'
        ),
        check((value: string) => {
          if (value.trim() === '') return true
          const numValue = parseFloat(value.trim())

          return numValue <= 9999
        }, 'Accounting Fee cannot exceed 9999')
      )
    ),
    cosec_fee: optional(
      pipe(
        string(),
        check(
          (value: string) => value.trim() === '' || /^\d+(\.\d{1,2})?$/.test(value.trim()),
          'CoSec Fee must be a valid number'
        ),
        check((value: string) => {
          if (value.trim() === '') return true
          const numValue = parseFloat(value.trim())

          return numValue <= 9999
        }, 'CoSec Fee cannot exceed 9999')
      )
    ),
    out_of_hours_fee: optional(
      pipe(
        string(),
        check(
          (value: string) => value.trim() === '' || /^\d+(\.\d{1,2})?$/.test(value.trim()),
          'Out of Hours Fee must be a valid number'
        ),
        check((value: string) => {
          if (value.trim() === '') return true
          const numValue = parseFloat(value.trim())

          return numValue <= 9999
        }, 'Out of Hours Fee cannot exceed 9999')
      )
    ),
    emergency_fee: optional(
      pipe(
        string(),
        check(
          (value: string) => value.trim() === '' || /^\d+(\.\d{1,2})?$/.test(value.trim()),
          'Emergency Fee must be a valid number'
        ),
        check((value: string) => {
          if (value.trim() === '') return true
          const numValue = parseFloat(value.trim())

          return numValue <= 9999
        }, 'Emergency Fee cannot exceed 9999')
      )
    ),
    fire_door_fee: optional(
      pipe(
        string(),
        check(
          (value: string) => value.trim() === '' || /^\d+(\.\d{1,2})?$/.test(value.trim()),
          'Fire Door Fee must be a valid number'
        ),
        check((value: string) => {
          if (value.trim() === '') return true
          const numValue = parseFloat(value.trim())

          return numValue <= 9999
        }, 'Fire Door Fee cannot exceed 9999')
      )
    ),
    anti_money_fee: optional(
      pipe(
        string(),
        check(
          (value: string) => value.trim() === '' || /^\d+(\.\d{1,2})?$/.test(value.trim()),
          'Anti Money Laundering Fee must be a valid number'
        ),
        check((value: string) => {
          if (value.trim() === '') return true
          const numValue = parseFloat(value.trim())

          return numValue <= 9999
        }, 'Anti Money Laundering Fee cannot exceed 9999')
      )
    )
  })
)

export const blockDetailsSchema = pipe(
  object({
    block_name: pipe(
      string(),
      nonEmpty('Block name is required'),
      minLength(2, 'Block name must be at least 2 characters')
    ),
    no_of_units: pipe(
      string(),
      nonEmpty('Number of units is required'),
      check((value: string) => /^\d+$/.test(value.trim()), 'Number of units must be a valid number'),
      check((value: string) => {
        const numValue = parseInt(value.trim())

        return numValue >= 1 && numValue <= 1000
      }, 'Number of units must be between 1 and 1000')
    ),
    current_managing_agent: pipe(
      string(),
      nonEmpty('Current managing agent is required'),
      minLength(2, 'Managing agent name must be at least 2 characters')
    ),
    number_of_blocks: pipe(
      string(),
      nonEmpty('Number of blocks is required'),
      check((value: string) => /^\d+$/.test(value.trim()), 'Number of blocks must be a valid number')
    ),
    year_built: pipe(
      string(),
      nonEmpty('Year built is required'),
      check((value: string) => {
        const validValues = ['pre_1900', '1900_1950', '1951_2000', '2001_2010', '2011_2020', '2021_2025']

        return validValues.includes(value.trim())
      }, 'Please select a valid year range')
    ),
    companies_house_search: optional(string()),
    confirm_identity: optional(string())
  })
)

export const loginSchema = pipe(
  object({
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
    password: pipe(string(), nonEmpty('Password is required'), minLength(8, 'Password must be at least 8 characters')),
    rememberMe: optional(boolean())
  })
)

export const forgotPasswordRequestSchema = pipe(
  object({
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address'))
  })
)

export const forgotPasswordSchema = pipe(
  object({
    newPassword: pipe(
      string(),
      nonEmpty('New password is required'),
      minLength(8, 'Password must be at least 8 characters'),
      check((value: string) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
      check((value: string) => /[a-z]/.test(value), 'Password must contain at least one lowercase letter'),
      check((value: string) => /[0-9]/.test(value), 'Password must contain at least one number'),
      check((value: string) => /[^A-Za-z0-9]/.test(value), 'Password must contain at least one special character')
    ),
    confirmPassword: pipe(string(), nonEmpty('Please confirm your password'))
  }),
  forward(
    check(input => input.newPassword === input.confirmPassword, 'Passwords do not match'),
    ['confirmPassword']
  )
)

export const resetPasswordSchema = pipe(
  object({
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
    password: pipe(
      string(),
      nonEmpty('Password is required'),
      minLength(8, 'Password must be at least 8 characters'),
      check((value: string) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
      check((value: string) => /[a-z]/.test(value), 'Password must contain at least one lowercase letter'),
      check((value: string) => /[0-9]/.test(value), 'Password must contain at least one number'),
      check((value: string) => /[^A-Za-z0-9]/.test(value), 'Password must contain at least one special character')
    ),
    confirmPassword: pipe(string(), nonEmpty('Please confirm your password'))
  }),
  forward(
    check(input => input.password === input.confirmPassword, 'Passwords do not match'),
    ['confirmPassword']
  )
)

export const rtmNonDirectorSchema = pipe(
  object({
    name: pipe(string(), nonEmpty('Name is required'), minLength(2, 'Name must be at least 2 characters')),
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
    phone_no: pipe(
      string(),
      nonEmpty('Phone number is required'),
      check(validateUKPhoneNumber, 'Please enter a valid UK phone number (e.g., 07123456789)')
    )
  })
)

export const insuranceSchema = pipe(
  object({
    fullname: pipe(
      string(),
      nonEmpty('Full name is required'),
      minLength(2, 'Full name must be at least 2 characters')
    ),
    national_id: pipe(
      string(),
      nonEmpty('National ID is required'),
      minLength(2, 'National ID must be at least 2 characters')
    ),
    contact: pipe(string(), nonEmpty('Contact is required'), minLength(8, 'Contact must be at least 8 characters')),
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
    date_of_birth: pipe(string(), nonEmpty('Date of birth is required')),
    address: pipe(string(), nonEmpty('Address is required'), minLength(5, 'Address must be at least 5 characters')),
    insurance_type: pipe(string(), nonEmpty('Insurance type is required')),
    plan_selection: pipe(string(), nonEmpty('Plan selection is required')),
    payment_method: pipe(string(), nonEmpty('Payment method is required'))
  })
)

export const retenderSchema = object({
  setDays: pipe(string(), minLength(1, 'Set days is required')),
  setMiles: pipe(string(), minLength(1, 'Set miles is required'))
})

export const profileSchema = pipe(
  object({
    first_name: pipe(
      string(),
      nonEmpty('First Name is required'),
      minLength(2, 'First Name must be at least 2 characters'),
      maxLength(20, 'First Name cannot exceed 20 characters'),
      regex(/^[A-Za-z\s]+$/, 'First Name must contain only letters')
    ),
    last_name: pipe(
      string(),
      nonEmpty('Last Name is required'),
      minLength(2, 'Last Name must be at least 2 characters'),
      maxLength(20, 'Last Name cannot exceed 20 characters'),
      regex(/^[A-Za-z\s]+$/, 'Last Name must contain only letters')
    ),
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
    mobile_number: pipe(
      string(),
      nonEmpty('Mobile number is required'),
      check(validateUKPhoneNumber, 'Please enter a valid UK phone number (e.g., 07123456789)')
    ),
    notify_email: boolean(),
    notify_message: boolean(),
    notify_portal: boolean()
  })
)

export const reviewsFormSchema = object({
  averageRating: pipe(
    string(),
    nonEmpty('Average Rating is required'),
    check((value: string) => {
      const num = Number(value.trim())

      return !isNaN(num) && num >= 1 && num <= 5
    }, 'Average Rating must be between 1 and 5')
  ),
  numberOfReviews: pipe(string(), nonEmpty('Number of Reviews is required'))
})

export const businessProfileSchema = object({
  tradingYears: pipe(string(), nonEmpty('Trading Years is required')),
  unitsManaged: pipe(
    string(),
    nonEmpty('Units Managed By Company is required'),
    check((value: string) => {
      const num = Number(value.trim())

      return !isNaN(num) && num >= 1 && num <= 1000000
    }, 'Units Managed By Company must be between 1 and 10,00,000')
  ),
  unitsAccountManager: pipe(
    string(),
    nonEmpty('Units Managed by account manager is required'),
    check((value: string) => {
      const num = Number(value.trim())

      return !isNaN(num) && num >= 1 && num <= 1000
    }, 'Units Managed by account manager must be between 1 and 1000')
  ),
  preferredContactNumber: pipe(string(), nonEmpty('Preferred Contact Number is required')),
  secondaryFullName: optional(string()),
  secondaryEmail: optional(string()),
  secondaryPhone: optional(string()),
  secondaryMobile: optional(string())
})

export const trustpilotFormSchema = object({
  averageRating: pipe(
    string(),
    nonEmpty('Average Rating is required'),
    check((value: string) => {
      const num = Number(value.trim())

      return !isNaN(num) && num >= 1 && num <= 5
    }, 'Average Rating must be between 1 and 5')
  ),
  numberOfReviews: pipe(string(), nonEmpty('Number of Reviews is required'))
})

export const managementFeeSchema = object({
  minimumFeePerUnit: pipe(
    string(),
    nonEmpty('Minimum Fee per Unit is required'),
    check((value: string) => {
      const num = Number(value.trim())

      return !isNaN(num) && num >= 100 && num <= 900
    }, 'Minimum Fee per Unit must be between 100 and 900')
  ),
  maximumFeePerUnit: pipe(
    string(),
    nonEmpty('Maximum Fee per Unit is required'),
    check((value: string) => {
      const num = Number(value.trim())

      return !isNaN(num) && num >= 100 && num <= 900
    }, 'Maximum Fee per Unit must be between 100 and 900')
  )
})

export const branchLocationSchema = object({
  contactName: pipe(string(), nonEmpty('Contact Name is required')),
  contactEmail: pipe(string(), nonEmpty('Contact Email is required'), email('Please enter a valid email address')),
  contactPhoneNumber: pipe(
    string(),
    nonEmpty('Contact Phone Number is required'),
    check(validateUKPhoneNumber, 'Please enter a valid UK phone number (e.g., 07123456789)')
  ),
  branchName: pipe(string(), nonEmpty('Branch Name is required')),
  postcode: pipe(string(), nonEmpty('Postcode is required'))
})

export const branchSchema = object({
  branch_name: pipe(
    string(),
    nonEmpty('Branch Name is required'),
    minLength(2, 'Branch Name must be at least 2 characters')
  ),
  address: pipe(string(), nonEmpty('Address is required'), minLength(5, 'Address must be at least 5 characters')),
  contact_name: pipe(string(), nonEmpty('Contact Name is required')),
  contact_email: pipe(string(), nonEmpty('Contact Email is required'), email('Please enter a valid email address')),
  contact_phone: pipe(
    string(),
    nonEmpty('Contact Phone Number is required'),
    check(validateUKPhoneNumber, 'Please enter a valid UK phone number (e.g., 07123456789)')
  ),
  postcode: pipe(string(), nonEmpty('Postcode is required'))
})

export const pmaOnboardingSchema = pipe(
  object({
    companyName: pipe(
      string(),
      nonEmpty('Company name is required'),
      minLength(2, 'Company name must be at least 2 characters')
    ),
    website: pipe(
      string(),
      nonEmpty('Company website is required'),
      check(validateWebsiteURL, 'Please enter a valid website URL (e.g., https://example.co.uk)')
    ),
    landline: pipe(string(), nonEmpty('Company landline is required')),
    fullName: pipe(
      string(),
      nonEmpty('First name is required'),
      minLength(2, 'First name must be at least 2 characters'),
      check((value: string) => value.length <= 15, 'First name cannot exceed 15 characters'),
      check(
        (value: string) => /^[a-zA-Z\s'-]+$/.test(value.trim()),
        'First name can only contain letters, spaces, hyphens, and apostrophes'
      ),
      check((value: string) => !/^\s|\s$/.test(value), 'First name cannot start or end with spaces'),
      check((value: string) => !/\d/.test(value), 'First name cannot contain numbers'),
      check(
        (value: string) => !/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/.test(value),
        'First name cannot contain special characters'
      )
    ),
    lastName: string(),
    mobileNumber: pipe(
      string(),
      nonEmpty('Mobile number is required'),
      check(validateUKPhoneNumber, 'Please enter a valid UK mobile number (e.g., 07123456789)')
    ),
    email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
    password: pipe(
      string(),
      nonEmpty('Password is required'),
      minLength(8, 'Password must be at least 8 characters'),
      check((value: string) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
      check((value: string) => /[a-z]/.test(value), 'Password must contain at least one lowercase letter'),
      check((value: string) => /[0-9]/.test(value), 'Password must contain at least one number'),
      check((value: string) => /[^A-Za-z0-9]/.test(value), 'Password must contain at least one special character')
    ),
    confirmPassword: pipe(string(), nonEmpty('Please confirm your password'))
  }),
  forward(
    check(input => input.password === input.confirmPassword, 'Passwords do not match'),
    ['confirmPassword']
  )
)

export const quoteFormSchema = object({
  managementFee: optional(string()),
  accountingFee: optional(string()),
  coSecFee: optional(string()),
  outOfHouseFee: optional(string()),
  emergencyLightingTasks: optional(string()),
  fireDoorInspections: optional(string()),
  amlMoneyLaunderingChecks: optional(string())
})

export const startDateSchema = object({
  startDate: pipe(string(), nonEmpty('Start date is required')),
  notes: pipe(string(), nonEmpty('Notes are required'))
})

export const templateSchema = object({
  name: pipe(
    string(),
    nonEmpty('Template name is required'),
    minLength(3, 'Template name must be at least 3 characters')
  )
})

export const templateFormSchema = object({
  name: pipe(
    string(),
    nonEmpty('Template name is required'),
    minLength(3, 'Template name must be at least 3 characters')
  ),
  message: pipe(
    string(),
    nonEmpty('Description is required'),
    minLength(10, 'Description must be at least 10 characters')
  )
})

export const editProfileSchema = object({
  contactName: pipe(string(), nonEmpty('Contact name is required')),
  email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
  website: pipe(
    string(),
    nonEmpty('Website is required'),
    check(validateWebsiteURL, 'Please enter a valid website URL')
  ),
  mobile: pipe(
    string(),
    nonEmpty('Mobile number is required'),
    check(validateUKPhoneNumber, 'Please enter a valid UK mobile number')
  ),
  landline: pipe(
    string(),
    nonEmpty('Landline is required'),
    check(validateUKLandlineNumber, 'Please enter a valid UK landline')
  ),
  address: pipe(string(), nonEmpty('Address is required')),
  minimumManagementFee: pipe(string(), nonEmpty('Minimum management fee is required')),
  maximumManagementFee: pipe(string(), nonEmpty('Maximum management fee is required')),
  preferredContact: pipe(string(), nonEmpty('Preferred contact is required')),
  secondaryContactName: pipe(string(), nonEmpty('Secondary contact name is required')),
  secondaryPhoneNumber: pipe(
    string(),
    nonEmpty('Secondary phone number is required'),
    check(validateUKPhoneNumber, 'Please enter a valid UK phone number')
  ),
  secondaryEmail: pipe(string(), nonEmpty('Secondary email is required'), email('Please enter a valid email address')),
  secondaryMobileLandline: pipe(
    string(),
    nonEmpty('Mobile/Landline is required'),
    check(validateUKPhoneNumber, 'Please enter a valid UK phone number')
  ),
  googleReviews: pipe(string(), nonEmpty('Google reviews is required')),
  trustpilotReviews: pipe(string(), nonEmpty('Trustpilot reviews is required')),
  companyBio: pipe(
    string(),
    nonEmpty('Company bio is required'),
    minLength(50, 'Company bio must be at least 50 characters')
  )
})

export const userSchema = object({
  name: pipe(
    string(),
    nonEmpty('Full name is required'),
    check((value: string) => value.trim().length >= 2, 'Full name must be at least 2 characters')
  ),
  email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
  mobile_number: pipe(
    string(),
    nonEmpty('Mobile number is required'),
    check(validateUKPhoneNumber, 'Please enter a valid UK mobile number')
  ),
  branch_id: pipe(
    number(),
    check(value => value > 0, 'Branch is required and must be a valid number')
  )
})
