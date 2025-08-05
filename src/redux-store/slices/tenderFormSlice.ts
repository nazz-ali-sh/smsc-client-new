import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import type { RootState } from '../index'

// Types
interface Question {
  question: string
  answer: string
}

interface DragAndDrop {
  id: string
  content: string
  subtext: string
}

interface TenderFormState {
  summary: string
  questions: Question[]
  dragList: DragAndDrop[]
  tender_id: number | null
}

// Initial State
const initialState: TenderFormState = {
  summary: '',
  questions: [
    {
      question: 'What service challenges have you experienced with your current managing agent?',
      answer:
        'We rarely receive updates about maintenance or upcoming works, and the accounts are often unclear or delayed.'
    },
    {
      question: 'How satisfied are you with the communication from your managing agent?',
      answer: 'Communication is inconsistent and often delayed.'
    },
    {
      question:
        'Are there any systems, tools, or financial reporting features that would improve how your block is managed?',
      answer: 'An online portal to log issues and a clear budget breakdown would help us a lot.'
    }
  ],
  dragList: [
    {
      id: 'item-1',
      content: 'Saving Money',
      subtext: 'I want to reduce my service charges and get better value for money.'
    },
    {
      id: 'item-2',
      content: 'Clearer Communication',
      subtext: 'I want regular updates and quicker replies from my managing agent.'
    },
    {
      id: 'item-3',
      content: 'Better Problem Solving',
      subtext: 'I want maintenance and issues dealt with quickly and properly.'
    },
    {
      id: 'item-4',
      content: 'Being Involved',
      subtext: 'I want to be consulted on important decisions about our building.'
    },
    {
      id: 'item-5',
      content: 'Proactive Management',
      subtext: 'I want potential issues identified and resolved before they escalate.'
    },
    {
      id: 'item-6',
      content: 'Higher Standards',
      subtext: 'I want a professional, consistent service that reflects pride in the block.'
    },
    {
      id: 'item-7',
      content: 'Clearer Financial Reporting',
      subtext: 'I want easy-to-understand budgets and breakdowns of what we’re paying for.'
    }
  ],
  tender_id: null
}

// Slice
const tenderFormSlice = createSlice({
  name: 'tenderForm',
  initialState,
  reducers: {
    setSummary(state, action: PayloadAction<string>) {
      state.summary = action.payload
    },
    setDragList(state, action: PayloadAction<DragAndDrop[]>) {
      state.dragList = action.payload
    },
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload
    },
    setTenderIds(state, action: PayloadAction<number | null>) {
      state.tender_id = action.payload
    },
    resetForm(state) {
      state.summary = initialState.summary
      state.questions = initialState.questions
      state.dragList = initialState.dragList
      state.tender_id = initialState.tender_id
    }
  }
})

// Persist Config
const persistConfig = {
  key: 'tenderForm',
  storage,
  whitelist: ['summary', 'questions', 'dragList', 'tender_id']
}

export const { setSummary, setDragList, setQuestions, setTenderIds, resetForm } = tenderFormSlice.actions

export const selectFormStateSummary = (state: RootState) => state.tenderForm.summary
export const selectFormStateDragList = (state: RootState) => state.tenderForm.dragList
export const selectFormStateQuestions = (state: RootState) => state.tenderForm.questions
export const selectFormStateTenderId = (state: RootState) => state.tenderForm.tender_id

export const persistedTenderFormReducer = persistReducer(persistConfig, tenderFormSlice.reducer)
