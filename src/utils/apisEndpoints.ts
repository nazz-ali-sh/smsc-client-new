export const apiEndpoints = {
  //---------------------- Login / Signup ------------------------//

  //---------------------- Onboarding Stepper----------------------//
  // onboarding: (step: any) => `rmc-onboarding?step=${step}`,
  onboarding: (step: any) => `/rmc/onboarding/step-${step}`,

  ballParkQuote: (session_Id: number | string) => `/rmc/ball-park-quote/${session_Id}`,

  //---------------------- RTM SETUP ------------------------------//
  getRoleRtm: `/rmc/rtm/setup`,

  setRtmRole: () => `/rmc/rtm/setup`,

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

  otpVerification: (user_id: number, otp: number | string) => `verify-email-otp?user_id=${user_id}&otp=${otp}`,

  //---------------------- Tender Result  ------------------------------//

  getTenderResult: (tender_id: number) => `rmc/blind-tender-responses?tender_id=${tender_id}`,

  selectShortListpma: () => 'rmc/pma-shortlist',

  finalShortList: (id: number) => `rmc/shortlisted-pmas/${id}`,

  getShortlistedCompantDetails: (user_id: number, type: string) =>
    `rmc/pma-company-detail?pma_id=${user_id}&type=${type}`,

  // getAvailableSlots: `rmc/video-call/available-days-slots`,
  getAvailableSlots: `rmc/availability/days-slots`,

  rmcVideoCallInvite: () => `rmc/video-call/invites`,

  gettingSlots: (date: any) => `rmc/video-call/slots-for-date?date=${date}`,

  gettingrmcshortlistStats: (tender_id: number) => `rmc/shortlist-agent/stats?tender_id=${tender_id}`,

  rmcAppintRmc: (tender_id: number) => `/rmc/appoint-pma?tender_id=${tender_id} `,

  rmcShortlistContact: `rmc/request-agent/request-contact`,

  rmcExtendDays: (tender_id: number) => `rmc/shortlist/${tender_id}/extend`
}
