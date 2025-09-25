import { object, string, pipe, nonEmpty, email, minLength, check, forward, optional, boolean } from 'valibot'

const validateUKPhoneNumber = (value: string): boolean => {
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

export const directorOfRMCSchema = pipe(
  object({
    fullName: pipe(
      string(),
      nonEmpty('First name is required'),
      minLength(2, 'First name must be at least 2 characters')
    ),
    lastName: pipe(
      string(),
      nonEmpty('Last name is required'),
      minLength(2, 'Last name must be at least 2 characters')
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
    managing_fee: pipe(
      string(),
      nonEmpty('Management Fee is required'),
      check((value: string) => /^\d+(\.\d{1,2})?$/.test(value.trim()), 'Management Fee must be a valid number')
    ),
    accounting_fee: pipe(
      string(),
      nonEmpty('Accounting Fee is required'),
      check((value: string) => /^\d+(\.\d{1,2})?$/.test(value.trim()), 'Accounting Fee must be a valid number')
    ),
    cosec_fee: pipe(
      string(),
      nonEmpty('CoSec Fee is required'),
      check((value: string) => /^\d+(\.\d{1,2})?$/.test(value.trim()), 'CoSec Fee must be a valid number')
    ),
    out_of_hours_fee: pipe(
      string(),
      nonEmpty('Out of Hours Fee is required'),
      check((value: string) => /^\d+(\.\d{1,2})?$/.test(value.trim()), 'Out of Hours Fee must be a valid number')
    ),
    emergency_fee: pipe(
      string(),
      nonEmpty('Emergency Fee is required'),
      check((value: string) => /^\d+(\.\d{1,2})?$/.test(value.trim()), 'Emergency Fee must be a valid number')
    ),
    fire_door_fee: pipe(
      string(),
      nonEmpty('Fire Door Fee is required'),
      check((value: string) => /^\d+(\.\d{1,2})?$/.test(value.trim()), 'Fire Door Fee must be a valid number')
    ),
    anti_money_fee: pipe(
      string(),
      nonEmpty('Anti Money Laundering Fee is required'),
      check(
        (value: string) => /^\d+(\.\d{1,2})?$/.test(value.trim()),
        'Anti Money Laundering Fee must be a valid number'
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
