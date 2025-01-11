import { UseStoreTypes } from "@/types/useStoreTypes";
import { websocketDataTypes } from "@/types/websocketDataTypes";
import { create } from "zustand";

export const useStore = create<UseStoreTypes>((set) => ({
  data: {
    priceChange: 0,
    priceChangePercent: 0,
    close: 0,
    high: 0,
    low: 0,
    quoteVolume: 0,
    numberOfTrades: 0,
  },
  setData: (newData: websocketDataTypes) => set({ data: newData }),
}));
