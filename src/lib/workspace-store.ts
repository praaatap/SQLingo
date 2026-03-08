"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SubmitStatus = "idle" | "accepted" | "wrong-answer" | "runtime-error" | "empty-output"

export interface ValidationResult {
  columnsMatch: boolean
  rowCountMatch: boolean
  valuesMatch: boolean
  expectedColumns: string[]
  actualColumns: string[]
  expectedRowCount: number
  actualRowCount: number
}

export interface QuestionProgress {
  solved: boolean
  lastQuery: string
  attempts: number
  lastRunTimestamp: number
}

interface WorkspaceState {
  // Current session state
  queryText: string
  activeTab: "results" | "error" | "tests"
  submitStatus: SubmitStatus
  validationResult: ValidationResult | null
  hintsUnlocked: boolean

  // Progress tracking
  progress: Record<string, QuestionProgress>

  // Actions
  setQueryText: (text: string) => void
  setActiveTab: (tab: "results" | "error" | "tests") => void
  setSubmitStatus: (status: SubmitStatus) => void
  setValidationResult: (result: ValidationResult | null) => void
  unlockHints: () => void
  resetSession: () => void

  // Progress actions
  saveProgress: (questionId: string, query: string) => void
  markSolved: (questionId: string) => void
  incrementAttempts: (questionId: string) => void
  getProgress: (questionId: string) => QuestionProgress | undefined
  loadSavedQuery: (questionId: string) => string | undefined
  resetAllProgress: () => void
}

const defaultProgress: QuestionProgress = {
  solved: false,
  lastQuery: "",
  attempts: 0,
  lastRunTimestamp: 0,
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      queryText: "",
      activeTab: "results",
      submitStatus: "idle",
      validationResult: null,
      hintsUnlocked: false,
      progress: {},

      setQueryText: (text) => set({ queryText: text }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSubmitStatus: (status) => set({ submitStatus: status }),
      setValidationResult: (result) => set({ validationResult: result }),
      unlockHints: () => set({ hintsUnlocked: true }),

      resetSession: () =>
        set({
          submitStatus: "idle",
          validationResult: null,
          hintsUnlocked: false,
          activeTab: "results",
        }),

      saveProgress: (questionId, query) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [questionId]: {
              ...defaultProgress,
              ...state.progress[questionId],
              lastQuery: query,
              lastRunTimestamp: Date.now(),
            },
          },
        })),

      markSolved: (questionId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [questionId]: {
              ...defaultProgress,
              ...state.progress[questionId],
              solved: true,
            },
          },
        })),

      incrementAttempts: (questionId) =>
        set((state) => {
          const current = state.progress[questionId] || defaultProgress
          return {
            progress: {
              ...state.progress,
              [questionId]: {
                ...current,
                attempts: current.attempts + 1,
              },
            },
          }
        }),

      getProgress: (questionId) => get().progress[questionId],

      loadSavedQuery: (questionId) => get().progress[questionId]?.lastQuery,

      resetAllProgress: () => set({ progress: {} }),
    }),
    {
      name: "sql-practice-progress",
      partialize: (state) => ({ progress: state.progress }),
    }
  )
)
