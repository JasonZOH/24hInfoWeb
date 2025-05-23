import { create } from 'zustand';

type State = {
  currentSection: number;
  audioEnabled: boolean;
  isMuted: boolean;
  volume: number;
  progress: number;
  setCurrentSection: (section: number) => void;
  toggleAudio: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
};

export const useStore = create<State>((set) => ({
  currentSection: 0,
  audioEnabled: false,
  isMuted: false,
  volume: 0.5,
  progress: 0,
  setCurrentSection: (section) => set({ currentSection: section }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
}));