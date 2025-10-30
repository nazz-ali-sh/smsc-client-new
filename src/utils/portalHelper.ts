export const isPmaPortal = (): boolean => {
  return process.env.NEXT_PUBLIC_SMSC_PORTAL === 'PMA'
}

export const isRmcPortal = (): boolean => {
  return process.env.NEXT_PUBLIC_SMSC_PORTAL === 'RMC'
}

export const getPortalType = (): string => {
  return process.env.NEXT_PUBLIC_SMSC_PORTAL || 'RMC'
}

export const isPmaUser = (userType: string | null): boolean => {
  return userType === 'pma_user'
}

export const isRmcUser = (userType: string | null): boolean => {
  return userType === 'rmc_user'
}

export const isPmaPortalAndUser = (userType: string | null): boolean => {
  return isPmaPortal() && isPmaUser(userType)
}

export const isRmcPortalAndUser = (userType: string | null): boolean => {
  return isRmcPortal() && isRmcUser(userType)
}
