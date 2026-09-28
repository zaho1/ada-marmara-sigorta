import { TICKER_MESSAGES, COMPANY } from '@/lib/constants';
import { Radio, BadgeCheck, ShieldCheck } from 'lucide-react';

export default function TickerBar() {
  const messages = [...TICKER_MESSAGES, ...TICKER_MESSAGES];

  return (
    <div className="bg-brand-950 text-white overflow-hidden border-b border-brand-800/50">
      {/* Authorization badge row */}
      <div className="border-b border-brand-800/40">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 px-4 py-1.5 text-center">
          <ShieldCheck className="h-4 w-4 text-green-400 shrink-0" />
          <span className="text-xs font-medium text-gray-200 whitespace-nowrap">
            Yetkili Sigorta Acentesi
          </span>
          <span className="hidden sm:inline text-brand-700">·</span>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-300 whitespace-nowrap">
            <BadgeCheck className="h-3.5 w-3.5 text-green-400" />
            Yetki No: <strong className="text-white">{COMPANY.authorizationNo}</strong>
          </span>
        </div>
      </div>

      {/* Live ticker row */}
      <div className="py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pl-4 pr-3 shrink-0 z-10 bg-brand-950">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-pulse-ring"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-green-400 whitespace-nowrap">
              Canlı
            </span>
          </div>
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {messages.map((msg, i) => (
                <span key={i} className="flex items-center gap-2 text-sm text-gray-200 mx-6">
                  <Radio className="h-3.5 w-3.5 text-accent-400 shrink-0" />
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
