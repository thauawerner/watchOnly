import { websocketDataTypes } from "@/types/websocketDataTypes";
export interface UseStoreTypes {
  data: websocketDataTypes;
  setData: (newData: websocketDataTypes) => void;
}
