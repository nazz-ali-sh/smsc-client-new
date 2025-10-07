export interface FileValidationOptions {
  allowedTypes: string[]
  maxSize: number
  errorMessage: string
}

export interface FileValidationResult {
  isValid: boolean
  errorMessage?: string
}

export const validateFile = (file: File, options: FileValidationOptions): FileValidationResult => {
  const { allowedTypes, maxSize, errorMessage } = options

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      errorMessage
    }
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      errorMessage
    }
  }

  return {
    isValid: true
  }
}

export const validateImageFile = (file: File, maxSizeInMB: number = 2): FileValidationResult => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml']

  const maxSize = maxSizeInMB * 1024 * 1024
  const errorMessage = `Logo Format: JPG, PNG, JPG, WebP, SVG Suggested Size: ${maxSizeInMB}MB`

  return validateFile(file, {
    allowedTypes,
    maxSize,
    errorMessage
  })
}
