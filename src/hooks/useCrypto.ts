import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { UseCryptoTypes } from "@/types/useCryptoTypes";
import { DataCryptoTypes } from "@/types/dataCryptoTypes";
import { dataCrypto } from "@/data/data";

export const useCrypto = create<UseCryptoTypes>()(
  persist(
    (set) => ({
      cryptoSelect: dataCrypto[0],
      setCryptoSelects: (newData: DataCryptoTypes) =>
        set({ cryptoSelect: newData }),
    }),
    {
      name: "@rifa77-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
