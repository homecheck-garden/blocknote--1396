import { create } from 'zustand'
import { useWriteToDatabase } from '@/functions/firebase/realtime-database'

export const useCanvasStore = create<{
    saveStatus: "unsaved" | "saving" | "saved" | "idle",
    currentCanvasId : string,
    setCurrentCanvasId : (value : string) => void,
    setSaveStatus: (value : "unsaved" | "saving" | "saved" | "idle") => void
}>((set) => ({
  saveStatus : 'idle',
  setSaveStatus: (value : "unsaved" | "saving" | "saved" | "idle") => set((state) => ({ saveStatus: value })),
  currentCanvasId : '',
  setCurrentCanvasId : (value : string) => set((state) => ({ currentCanvasId: value })),


}))



