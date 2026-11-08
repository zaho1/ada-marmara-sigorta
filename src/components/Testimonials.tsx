import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-accent-50 px-4 py-1.5 text-sm font-semibold text-accent-700 mb-3">
            Müşteri Yorumları
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            Müşterilerimiz Ne Diyor?
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-gray-900">4.9/5</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">500+ değerlendirme</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-white border border-gray-100 p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <Quote className="absolute top-5 right-5 h-10 w-10 text-brand-100" />
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-5 relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Embed */}
        <div className="mt-12">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=Karaosman+Ulus+Cd+No41+54100+Adapazarı+Sakarya&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
