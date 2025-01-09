import { useEffect } from "react";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import useWebSocket from "react-use-websocket";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataCryptoTypes {
  name: string;
  prefix: string;
  pair: string;
}

const dataCrypto: DataCryptoTypes[] = [
  { name: "Bitcoin", prefix: "btc", pair: "btcusdt" },
  { name: "Ethereum", prefix: "eth", pair: "ethusdt" },
  { name: "Binance Coin", prefix: "bnb", pair: "bnbusdt" },
];

interface UseCryptoTypes {
  cryptoSelect: DataCryptoTypes;
  setCryptoSelects: (newData: DataCryptoTypes) => void;
}

interface DataTypes {
  priceChange: number;
  priceChangePercent: number;
  close: number;
  high: number;
  low: number;
  quoteVolume: number;
  numberOfTrades: number;
}

interface UseStoreTypes {
  data: DataTypes;
  setData: (newData: DataTypes) => void;
}

const useStore = create<UseStoreTypes>((set) => ({
  data: {
    priceChange: 0,
    priceChangePercent: 0,
    close: 0,
    high: 0,
    low: 0,
    quoteVolume: 0,
    numberOfTrades: 0,
  },
  setData: (newData: DataTypes) => set({ data: newData }),
}));

const useCrypto = create<UseCryptoTypes>()(
  persist(
    (set) => ({
      cryptoSelect: dataCrypto[0],
      setCryptoSelects: (newData: DataCryptoTypes) => set({ cryptoSelect: newData }),
    }),
    {
      name: "@rifa77-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function getSignal(value: number): string {
  return value >= 0 ? `+${value}` : `${value}`;
}

export default function DynamicConnection() {
  const { data, setData } = useStore();
  const { cryptoSelect, setCryptoSelects } = useCrypto();

  // Adiciona useEffect para garantir que o WebSocket só seja iniciado no cliente
  useEffect(() => {
    const { sendMessage, lastJsonMessage } = useWebSocket(
      `wss://stream.binance.com:9443/ws/${cryptoSelect.pair}@ticker`,
      {
        onOpen: () => console.log("WebSocket connected"),
        onMessage: (event) => {
          const lastJsonMessage = JSON.parse(event.data);
          setData({
            priceChange: parseFloat(lastJsonMessage.p),
            priceChangePercent: parseFloat(lastJsonMessage.P),
            close: lastJsonMessage.c,
            high: lastJsonMessage.h,
            low: lastJsonMessage.l,
            quoteVolume: lastJsonMessage.q,
            numberOfTrades: lastJsonMessage.n,
          });
        },
        onError: (event) => console.error("WebSocket error:", event),
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 3000,
      }
    );
    return () => {
      // Fechar o WebSocket ao desmontar o componente
      sendMessage?.close();
    };
  }, [cryptoSelect, setData]);

  const handleCryptoChange = (pair: string) => {
    const selectedCrypto = dataCrypto.find((crypto) => crypto.pair === pair);
    if (selectedCrypto) {
      setCryptoSelects(selectedCrypto);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Dinamic Connection</h1>
      <h1>Selected Cryptocurrency: {cryptoSelect.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">WebSocket Data</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Preço Atual:</span>
            <span>{data.close}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Alteração:</span>
            <span>
              {getSignal(data.priceChange)} ({getSignal(data.priceChangePercent)}%)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Máxima 24h:</span>
            <span>{data.high}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Mínima 24h:</span>
            <span>{data.low}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Trades:</span>
            <span>{data.numberOfTrades}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Volume:</span>
            <span>{data.quoteVolume}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Select onValueChange={handleCryptoChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={cryptoSelect.name} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Criptomoeda</SelectLabel>
              {dataCrypto.map((crypto) => (
                <SelectItem key={crypto.pair} value={crypto.pair}>
                  {crypto.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
