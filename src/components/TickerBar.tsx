import { TICKER_MESSAGES } from '@/lib/constants';
import { Radio } from 'lucide-react';

export default function TickerBar() {
  const messages = [...TICKER_MESSAGES, ...TICKER_MESSAGES];

  return (
    <div className="bg-brand-950 text-white overflow-hidden border-b border-brand-800/50">
      <div className="py-1.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 pl-3 pr-2 shrink-0 z-10 bg-brand-950">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-pulse-ring"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-green-400 whitespace-nowrap">
              Canlı
            </span>
          </div>
          <div className="flex overflow-hidden flex-1">
            <div className="flex animate-marquee whitespace-nowrap">
              {messages.map((msg, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[10px] text-gray-200 mx-6">
                  <Radio className="h-2.5 w-2.5 text-accent-400 shrink-0" />
                  {msg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
