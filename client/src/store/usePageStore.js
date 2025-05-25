import {create} from 'zustand';


export const usePageStore = create((set) => ({
  step: 0,
  setNextStep: () => {
    set({ step: 1})
  },
  setPreviousStep: () => {
    set({ step: 0 })
  },
}));
