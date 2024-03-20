import create from 'zustand';

interface BearState {
  bears: number;
  increase: (by: number) => void;
  removeAllBears: () => void;
}

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: (by: number) => set((state) => ({ bears: state.bears + by })),
  removeAllBears: () => set({ bears: 0 }),
}));
