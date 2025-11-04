import { PMA_PORTAL, PMA_USER, RMC_PORTAL, RMC_USER } from '@/constants'

export const isPmaPortal = (): boolean => {
  return process.env.NEXT_PUBLIC_SMSC_PORTAL === PMA_PORTAL
}

export const isRmcPortal = (): boolean => {
  return process.env.NEXT_PUBLIC_SMSC_PORTAL === RMC_PORTAL
}

export const getPortalType = (): string => {
  return process.env.NEXT_PUBLIC_SMSC_PORTAL || RMC_PORTAL
}

export const isPmaUser = (userType: string | null): boolean => {
  return userType === PMA_USER
}

export const isRmcUser = (userType: string | null): boolean => {
  return userType === RMC_USER
}

export const isPmaPortalAndUser = (userType: string | null): boolean => {
  return isPmaPortal() && isPmaUser(userType)
}

export const isRmcPortalAndUser = (userType: string | null): boolean => {
  return isRmcPortal() && isRmcUser(userType)
}
