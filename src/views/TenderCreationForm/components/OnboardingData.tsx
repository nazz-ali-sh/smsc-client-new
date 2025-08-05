import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '@/redux-store'

export const selectFormState = (state: RootState) => state.form

// Selector to structure the form state for display
export const selectFormStateSummary = createSelector([selectFormState], formState => ({
  aboutYou: {
    role: formState.steps.aboutYou?.role || 'N/A',
    rmcNumber: formState.steps.aboutYou?.rmcNumber || 'N/A',
    leaseholdType: formState.steps.aboutYou?.leaseholdType || 'N/A',
    blockCondition: formState.steps.aboutYou?.blockCondition || 'N/A',
    nonLeaseholder: formState.steps.aboutYou?.nonLeaseholder || 'N/A',
    outdoorSpace: formState.steps.aboutYou?.outdoorSpace || 'N/A',
    rtmRole: formState.steps.aboutYou?.rtmRole || 'N/A'
  },
  location: {
    address: formState.steps.location?.address || 'N/A',
    coordinates: formState.steps.location?.coordinates
      ? {
          lat: formState.steps.location.coordinates.lat,
          lng: formState.steps.location.coordinates.lng,
          formattedAddress: formState.steps.location.coordinates.formattedAddress || 'N/A'
        }
      : null
  },
  blockDetails: {
    numberOfBlocks: formState.steps.blockDetails?.numberOfBlocks || 'N/A',
    totalUnits: formState.steps.blockDetails?.totalUnits || 'N/A',
    yearBuilt: formState.steps.blockDetails?.yearBuilt || 'N/A',
    serviceChargeBudget: formState.steps.blockDetails?.serviceChargeBudget || 'N/A',
    budgetToggle: formState.steps.blockDetails?.budgetToggle ? 'Yes' : 'No',
    currentManagementFee: formState.steps.blockDetails?.currentManagementFee || 'N/A',
    feeToggle: formState.steps.blockDetails?.feeToggle ? 'Yes' : 'No'
  },
  tenderDetails: {
    fullName: formState.steps.tenderDetails?.fullName || 'N/A',
    email: formState.steps.tenderDetails?.email || 'N/A',
    mobile: formState.steps.tenderDetails?.mobile || 'N/A',
    address: formState.steps.tenderDetails?.address || 'N/A',
    blockName: formState.steps.tenderDetails?.blockName || 'N/A',
    currentManagingAgent: formState.steps.tenderDetails?.currentManagingAgent || 'N/A',
    verificationMethod: formState.steps.tenderDetails?.verificationMethod || 'N/A'
  }
}))
