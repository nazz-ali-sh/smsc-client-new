export const apiEndpoints = {
  //---------------------- Login / Signup ------------------------//
  login: () => `/auth/login`,
  forgotPassword: () => `/auth/forgot-password`,
  resetPassword: () => `/auth/reset-password`,
  meWithOnboarding: () => `/auth/me-with-onboarding`,

  //---------------------- Onboarding Stepper----------------------//
  // onboarding: (step: any) => `rmc-onboarding?step=${step}`,
  rmcOnboarding: () => `/rmc/onboarding`,
  rmcOnboardingVerification: () => `/rmc/verification`,

  rmcBudget: () => `/rmc/tender-onboarding`,
  rmcStep5Status: () => `/rmc/tender-onboarding/step-5/status`,
  rmcPriorities: () => `/rmc/tender-onboarding`,
  rmcBlockDetails: () => `/rmc/tender-onboarding`,

  ballParkQuote: (session_Id: number | string) => `/rmc/ball-park-quote/${session_Id}`,

  //---------------------- RTM SETUP ------------------------------//
  getRoleRtm: `/rmc/rtm/setup`,

  setRtmRole: () => `/rmc/rtm/setup`,

  rtmNonDirector: () => `/rmc/non-director`,

  //---------------------- Availability ---------------------------//
  availabilitySlots: () => `/rmc/availability/slots`,

  nearByPma: (lat: number, lng: number, radius = 10) =>
    `/rmc/rtm/nearby?lat=${lat}&lng=${lng}&radius=${radius}&limit=20`,

  //---------------------- Dashbaord Apis ------------------------//

  getDashboardData: (tender_id: number) => `rmc/dashboard?tender_id=${tender_id}`,

  getDashbaordFaq: (tender_id: number) => `/rmc/faqs?tender_id=${tender_id}`,

  getTenderId: `/rmc/tenders`,

  //---------------------- Tender Creation ------------------------------//

  getPriorities: `/rmc/priorities`,

  getActivactionQuestion: `/rmc/questions`,

  tenderActivaction: `rmc/tender-activation`,

  gettingOnboardingData: (funnel_id: number | string) => `rmc/onboarding/funnel/${funnel_id}`,

  //---------------------- Otp verification  ------------------------------//

  otpVerification: () => `/rmc/otp-verification`,

  resendCode: () => `/rmc/tender-onboarding/resend-code`,

  //---------------------- Postcode lookup  ------------------------------//

  postcodeLookup: (postcode: string) => `https://api.ideal-postcodes.co.uk/v1/postcodes/${postcode}`,

  //---------------------- Tender Result  ------------------------------//

  getTenderResult: (tender_id: number) => `rmc/blind-tender-responses?tender_id=${tender_id}`,

  selectShortListpma: () => 'rmc/pma-shortlist',

  finalShortList: (id: number) => `rmc/shortlist/details/${id}`,

  // shortlist

  getShortlistedCompantDetails: (user_id: number, type: string) =>
    `rmc/pma-company-detail?pma_id=${user_id}&type=${type}`,

  gettingBlindTenderPdf: (tender_id: number) => `rmc/blind-tenders/report/pdf?tender_id=${tender_id}`,

  // getAvailableSlots: `rmc/video-call/available-days-slots`,
  getAvailableSlots: `rmc/availability/days-slots`,

  rmcVideoCallInvite: () => `rmc/video-call/invites`,

  rmcSideVisitInvite: () => `rmc/site-visit/invites`,

  gettingSlots: (date: any) => `rmc/video-call/slots-for-date?date=${date}`,

  // video-call/slots-for-date?date=2024-01-15

  //---------------------- Short List  ------------------------------//

  gettingSideInvitesSlots: (date: any) => `rmc/site-visit/slots-for-date?date=${date}`,

  gettingrmcshortlistStats: (tender_id: number) => `rmc/shortlist-agent/stats?tender_id=${tender_id}`,

  rmcAppintRmc: (tender_id: number) => `/rmc/appoint-pma?tender_id=${tender_id} `,

  rmcShortlistContact: `rmc/request-agent/request-contact`,

  rmcExtendDays: (tender_id: number) => `rmc/shortlist/${tender_id}/extend`,

  rmcgetExtendExpiryDate: (tender_id: number) => `rmc/shortlist/${tender_id}/expiry`,

  gettingAllShortlistedPma: (tender_id: number) => `rmc/shortlist/${tender_id}`,

  //---------------------- Site Visit Apis  ------------------------------//

  rmcSiteVisit: (status: string, tender_id: number) => `rmc/site-visit/invites?status=${status}&tender_id=${tender_id}`,

  rmcVideoCallsInvite: (status: string, tender_id: number) =>
    `rmc/video-call/invites?status=${status}&tender_id=${tender_id}`,

  //---------------------- Video Calls Apis  ------------------------------//

  rmcSchedualAgain: () => `rmc/video-call/invites/rescheduled/reschedule`,

  rmcRejectInvite: () => `rmc/video-call/invites/rescheduled/reject`,

  rmcAcceptRechedual: () => `/rmc/video-call/invites/rescheduled/accept`,

  // rmcVideoCallReschedual: () => `/rmc/video-call/invites/rescheduled/accept`,

  rmcVideoCallCancel: () => `/rmc/video-call/invites/cancel`,

  //---------------------- Site Visit  ------------------------------//

  rmcsiteVisitSchedualAgain: () => `rmc/site-visit/invites/rescheduled/reschedule`,

  rmcSiteVisityRejectInvite: () => `rmc/site-visit/invites/rescheduled/reject`,

  rmcSiteVisitCancelled: () => `rmc/site-visit/invites/cancel`,

  rmcSiteVisitAcceptReschedual: () => `rmc/site-visit/invites/rescheduled/accept`,

  //---------------------- Final selection   ------------------------------//

  gettingFianlSelectionDetails: (tender_id: number) => `/rmc/final-page-detail?tender_id=${tender_id}`,

  //---------------------- Tender Information   ------------------------------//

  getTenderDetail: (tender_id: number) => `/rmc/tender/detail?tender_id=${tender_id}`,

  gettingFinalSelectionPdf: (tender_id: number) => `/rmc/final-report/pdf?tender_id=${tender_id}`,

  //---------------------- Archive    ------------------------------//

  gettingAchiveData: (filter: string) => `rmc/tenders/archived?filter=${filter}`,

  gettingArchiveDetails: (tender_id: number, pma_user_id?: number) => {
    return pma_user_id
      ? `rmc/tenders/archived/${tender_id}?pma_user_id=${pma_user_id}`
      : `rmc/tenders/archived/${tender_id}`
  },

  //---------------------- Eveluation  ------------------------------//

  eveluationCatagories: (tender_id: number) => `rmc/evaluation-categories?tender_id=${tender_id}`,

  gettingCalanderData: (tender_id: number, status: string, type: string, month: string, date: string) =>
    `rmc/calendar?tender_id=${tender_id}&view=${status}&type=${type}&month=${month}&date=${date}`,

  addEvaluationMetric: () => 'rmc/evaluation-categories',

  editEvaluationMetric: (id: number) => `rmc/evaluation-categories/${id}`,

  removeEvaluationCatagory: (id: number, tender_id: number) => `rmc/evaluation-categories/${id}?tender_id=${tender_id}`

  // api/rmc/evaluation-categories
}
