import type { Control, FieldPath, FieldValues } from 'react-hook-form'

declare global {
  interface FormInputProps<T extends FieldValues = FieldValues> {
    name: FieldPath<T>
    control: Control<T>
    type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'string'
    placeholder?: string
    required?: boolean
    disabled?: boolean
    fullWidth?: boolean
    multiline?: boolean
    rows?: number
    helperText?: string
    error?: boolean
    variant?: 'outlined' | 'filled' | 'standard'
    size?: 'small' | 'medium'
    className?: string
    sx?: any
    icon?: React.ReactNode
    onIconClick?: (event: React.MouseEvent<HTMLElement>) => void
    onIconHover?: (event: React.MouseEvent<HTMLElement>) => void
    onIconLeave?: () => void
    showPasswordToggle?: boolean
  }

  interface DirectorOfRMCFormData {
    fullName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    confirmPassword: string
  }

  interface PostcodeFormData {
    postcode: string
  }

  interface BudgetFormData {
    managing_fee: string
    accounting_fee: string
    cosec_fee: string
    out_of_hours_fee: string
    emergency_fee: string
    fire_door_fee: string
    anti_money_fee: string
  }

  interface BlockDetailsFormData {
    block_name: string
    name: string
    no_of_units: string
    current_managing_agent: string
    number_of_blocks: string
    year_built: string
    companies_house_search?: string
    confirm_identity?: string
  }

  interface LoginFormData {
    email: string
    password: string
    rememberMe: boolean
  }

  interface ForgotPasswordFormData {
    newPassword: string
    confirmPassword: string
  }

  interface RmcOnboardingData {
    user_id: number
    onboarding_id: number
    verified: boolean
    status: string
    current_step: number
    next_step: number
    token: string
    is_completed: boolean
  }

  interface FormFieldProps<T extends FieldValues = FieldValues> extends FormInputProps<T> {}

  interface SelectOption {
    label: string
    value: string | number
  }

  interface FormSelectProps<T extends FieldValues = FieldValues> {
    name: FieldPath<T>
    control: Control<T>
    label: string
    options: SelectOption[]
    placeholder?: string
    required?: boolean
    disabled?: boolean
    fullWidth?: boolean
    variant?: 'outlined' | 'filled' | 'standard'
    size?: 'small' | 'medium'
    className?: string
    sx?: any
  }
}

export {}
