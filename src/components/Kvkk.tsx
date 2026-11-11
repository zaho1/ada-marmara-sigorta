import { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const RIGHTS = [
  'Kişisel verilerinizin işlenip işlenmediğini öğrenme,',
  'Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,',
  'Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,',
  'Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,',
  'Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,',
  'KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,',
  'Düzeltme, silme ve yok edilme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,',
  'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,',
  'Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.',
];

function Section({ no, title, children }: { no: number; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-gray-900">
        {no}. {title}
      </h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

export default function Kvkk() {
  useEffect(() => {
    document.title = 'KVKK Aydınlatma Metni | Ada Marmara Sigorta';
  }, []);

  return (
    <main className="bg-gray-50 min-h-[70vh]">
      <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex items-center gap-2 text-accent-400 text-sm font-semibold uppercase tracking-wide">
            <ShieldCheck className="h-4 w-4" />
            Kişisel Verilerin Korunması
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            KVKK Aydınlatma Metni
          </h1>
          <p className="mt-3 max-w-2xl text-gray-200">
            6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi kapsamında, kişisel
            verilerinizin nasıl işlendiğine dair bilgilendirme.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 space-y-8">
          <Section no={1} title="Veri Sorumlusu">
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verileriniz;
              veri sorumlusu sıfatıyla <strong>{COMPANY.legalName}</strong> (“Acente”) tarafından
              aşağıda açıklanan kapsamda işlenebilecektir.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Adres: {COMPANY.address}</li>
              <li>E-posta: {COMPANY.email}</li>
              <li>Telefon: {COMPANY.phone}</li>
              <li>Mersis No: {COMPANY.mersisNo}</li>
            </ul>
          </Section>

          <Section no={2} title="İşlenen Kişisel Veriler">
            <p>Teklif formu ve iletişim kanallarımız aracılığıyla aşağıdaki verileriniz işlenebilir:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kimlik bilgileriniz: ad, soyad, T.C. kimlik numarası</li>
              <li>İletişim bilgileriniz: telefon numarası</li>
              <li>Araç bilgileriniz: plaka (trafik ve kasko teklifleri için)</li>
              <li>Adres bilgileriniz: il, ilçe, mahalle (DASK ve konut teklifleri için)</li>
              <li>Talep bilgileriniz: teklif istediğiniz sigorta türü ve talep tarihi</li>
            </ul>
            <p>
              Sağlık sigortası gibi özel nitelikli kişisel veri işlenmesini gerektiren işlemlerde,
              bu veriler yalnızca ayrıca alınacak açık rızanıza dayanılarak işlenir.
            </p>
          </Section>

          <Section no={3} title="Kişisel Verilerin İşlenme Amaçları">
            <ul className="list-disc pl-6 space-y-1">
              <li>Talep ettiğiniz sigorta türleri için teklif hazırlanması ve size iletilmesi,</li>
              <li>Tekliflerin ilgili sigorta şirketlerinden temin edilmesi,</li>
              <li>Poliçe düzenleme, yenileme ve sigorta aracılık faaliyetlerinin yürütülmesi,</li>
              <li>Sizinle telefon, WhatsApp veya e-posta yoluyla iletişime geçilmesi,</li>
              <li>Talep, şikâyet ve başvurularınızın sonuçlandırılması,</li>
              <li>Sigortacılık mevzuatı ve diğer mevzuattan doğan yükümlülüklerin yerine getirilmesi,</li>
              <li>Bilgi güvenliği süreçlerinin yürütülmesi.</li>
            </ul>
          </Section>

          <Section no={4} title="Toplama Yöntemi ve Hukuki Sebepler">
            <p>
              Kişisel verileriniz, internet sitemizdeki teklif formu, telefon, WhatsApp ve e-posta
              gibi kanallar üzerinden elektronik ortamda toplanmaktadır.
            </p>
            <p>
              Bu veriler KVKK’nın 5. maddesinin 2. fıkrasında yer alan; bir sözleşmenin kurulması
              veya ifasıyla doğrudan doğruya ilgili olması, veri sorumlusunun hukuki yükümlülüğünü
              yerine getirebilmesi için zorunlu olması, bir hakkın tesisi, kullanılması veya
              korunması için veri işlemenin zorunlu olması ve ilgili kişinin temel hak ve
              özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaatleri için veri
              işlenmesinin zorunlu olması hukuki sebeplerine dayanılarak işlenmektedir.
            </p>
          </Section>

          <Section no={5} title="Kişisel Verilerin Aktarılması">
            <p>Kişisel verileriniz, yukarıda belirtilen amaçlarla ve KVKK’nın 8. ve 9. maddelerine uygun olarak;</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Teklif ve poliçe sürecinin yürütülmesi için iş birliği yaptığımız sigorta şirketlerine,</li>
              <li>Sigortacılık mevzuatı gereği yetkili kamu kurum ve kuruluşlarına ile Sigorta Bilgi ve Gözetim Merkezi gibi yasal olarak yetkili kuruluşlara,</li>
              <li>Web sitesi barındırma, veri tabanı, e-posta ve mesajlaşma altyapısı hizmetlerini sunan hizmet sağlayıcılarımıza,</li>
              <li>Hukuki zorunluluk hâlinde yetkili mercilere</li>
            </ul>
            <p>
              aktarılabilir. Hizmet sağlayıcılarımızın sunucuları yurt dışında bulunabilir; bu
              durumda aktarım, KVKK’nın 9. maddesi ve ilgili mevzuata uygun şekilde yapılır.
            </p>
          </Section>

          <Section no={6} title="Saklama Süresi">
            <p>
              Kişisel verileriniz, işlenme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen
              saklama süreleri boyunca muhafaza edilir; bu sürelerin sona ermesi hâlinde silinir,
              yok edilir veya anonim hâle getirilir.
            </p>
          </Section>

          <Section no={7} title="KVKK Madde 11 Kapsamındaki Haklarınız">
            <p>Veri sahibi olarak KVKK’nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-1">
              {RIGHTS.map((right) => (
                <li key={right}>{right}</li>
              ))}
            </ul>
          </Section>

          <Section no={8} title="Başvuru Yöntemi">
            <p>
              Yukarıda belirtilen haklarınıza ilişkin taleplerinizi, kimliğinizi tespit edici
              belgelerle birlikte yazılı olarak <strong>{COMPANY.address}</strong> adresine
              iletebilir veya bize daha önce bildirdiğiniz e-posta adresiniz üzerinden{' '}
              <strong>{COMPANY.email}</strong> adresine gönderebilirsiniz.
            </p>
            <p>
              Başvurularınız, talebin niteliğine göre en geç otuz gün içinde ücretsiz olarak
              sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel Verileri
              Koruma Kurulu tarafından belirlenen tarifedeki ücret talep edilebilir.
            </p>
          </Section>

          <p className="border-t border-gray-100 pt-6 text-sm text-gray-500">
            Son güncelleme: Kasım 2026
          </p>
        </article>
      </div>
    </main>
  );
}
