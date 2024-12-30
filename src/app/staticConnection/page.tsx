'use client';

import { create } from 'zustand'
import useWebSocket from 'react-use-websocket';

const useStore = create((set) => ({
  data: {},
  setData: (newData) => set({ data: newData }),
}));

export default function StaticConnection() {
  const { data, setData } = useStore();

  useWebSocket(`wss://stream.binance.com:9443/ws/btcusdt@ticker`, {
    onOpen: () => console.log('WebSocket connected'),
    onMessage: (event) => {
      const lastJsonMessage = JSON.parse(event.data);
      setData({
        priceChange: parseFloat(lastJsonMessage.p),
        priceChangePercent: parseFloat(lastJsonMessage.P),
        close: lastJsonMessage.c,
        high: lastJsonMessage.h,
        low: lastJsonMessage.l,
        quoteVolume: lastJsonMessage.q,
      });
    },
    onError: (event) => console.error('WebSocket error:', event),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Static Connection</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">WebSocket Data</h2>
        <pre className="text-sm text-gray-600 bg-gray-200 p-4 rounded-md">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>

  );
}
