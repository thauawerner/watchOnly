'use client'
import useWebSocket from "react-use-websocket";
import { dataCrypto } from "@/data/data";
import { getSignal } from "@/utils/utils";
import { useStore } from "@/hooks/useStore";
import { useCrypto } from "@/hooks/useCrypto";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DynamicConnection() {
  const { data, setData } = useStore();
  const { cryptoSelect, setCryptoSelects } = useCrypto();

  // Configura o WebSocket
  const { lastJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${cryptoSelect.pair}@ticker`,
    {
      onOpen: () => console.log("WebSocket connected"),
      onMessage: (event) => {
        const message = JSON.parse(event.data);
        setData({
          priceChange: parseFloat(message.p),
          priceChangePercent: parseFloat(message.P),
          close: message.c,
          high: message.h,
          low: message.l,
          quoteVolume: message.q,
          numberOfTrades: message.n,
        });
      },
      onError: (event) => console.error("WebSocket error:", event),
      shouldReconnect: () => true,
      reconnectInterval: 3000,
    }
  );

  const handleCryptoChange = (pair: string) => {
    const selectedCrypto = dataCrypto.find((crypto) => crypto.pair === pair);
    if (selectedCrypto) {
      setCryptoSelects(selectedCrypto);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Dynamic Connection</h1>
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
