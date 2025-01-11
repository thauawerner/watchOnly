import { DataCryptoTypes } from "@/types/dataCryptoTypes";
export interface UseCryptoTypes {
  cryptoSelect: DataCryptoTypes;
  setCryptoSelects: (newData: DataCryptoTypes) => void;
}
