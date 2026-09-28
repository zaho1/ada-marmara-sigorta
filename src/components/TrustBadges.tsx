import { Headphones, BadgePercent, Zap, Building2 } from 'lucide-react';
import { TRUST_BADGES } from '@/lib/constants';

const ICONS: Record<string, typeof Headphones> = {
  Headphones,
  BadgePercent,
  Zap,
  Building2,
};

export default function TrustBadges() {
  return (
    <section id="neden-biz" className="bg-white section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-3">
            Neden Biz?
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            Güveninizi Kazanıyoruz
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Sakarya'da yılların deneyimiyle sigorta ihtiyaçlarınız için yanınızdayız.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_BADGES.map((badge, i) => {
            const Icon = ICONS[badge.icon];
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-200"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 transition-all group-hover:from-brand-600 group-hover:to-brand-800">
                  <Icon className="h-8 w-8 text-brand-700 transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{badge.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
