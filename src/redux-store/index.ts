import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

import formReducer from '@/redux-store/slices/multiStepForm'
import { persistedTenderFormReducer } from './slices/tenderFormSlice'
import pmaRegistrationReducer from '@/redux-store/slices/pmaRegistrationSlice'
import pmaOnboardingFormReducer from '@/redux-store/slices/pmaOnboardingFormSlice'
import branchReducer from '@/redux-store/slices/branchSlice'
import userReducer from '@/redux-store/slices/userSlice'
import calendarReducer from '@/redux-store/slices/rmcCalendar'
import rmcCalendarReducer from '@/redux-store/slices/rmcCalendar'
import siteVisitAndCallStatsReducer from '@/redux-store/slices/sideVisitAndCallStatsSlice'
import rmcOnboardingReducer from '@/redux-store/slices/rmcOnboardingSlice'
import rtmNonDirectorReducer from '@/redux-store/slices/rtmNonDirectorSlice'
import postcodeReducer from '@/redux-store/slices/postcodeSlice'
import tabSlice from '@/redux-store/slices/tabSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'form',
    'tenderForm',
    'pmaRegistration',
    'pmaOnboardingForm',
    'branches',
    'users',
    'rmcOnboarding',
    'rtmNonDirector'
  ]
}

const rootReducer = combineReducers({
  form: formReducer,
  tenderForm: persistedTenderFormReducer,
  pmaRegistration: pmaRegistrationReducer,
  pmaOnboardingForm: pmaOnboardingFormReducer,
  branches: branchReducer,
  users: userReducer,
  calendarReducer: calendarReducer,
  rmcCalendarReducer: rmcCalendarReducer,
  siteVisitAndCallStats: siteVisitAndCallStatsReducer,
  rmcOnboarding: rmcOnboardingReducer,
  rtmNonDirector: rtmNonDirectorReducer,
  postcode: postcodeReducer,
  tabSwitch: tabSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
