import TickerBar from '@/components/TickerBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InsuranceTypes from '@/components/InsuranceTypes';
import Partners from '@/components/Partners';
import InsuranceGuide from '@/components/InsuranceGuide';
import WhyAdaMarmara from '@/components/WhyAdaMarmara';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import About from '@/components/About';
import Footer from '@/components/Footer';
import SigortaAktuel from '@/components/SigortaAktuel';
import Admin from '@/components/Admin';
import Kvkk from '@/components/Kvkk';

function HomePage() {
  return (
    <main>
      <Hero />
      <InsuranceTypes />
      <Partners />
      <InsuranceGuide />
      <WhyAdaMarmara />
      <Testimonials />
      <FAQ />
      <About />
    </main>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  // Yönetim paneli: sitenin üst/alt kısmı olmadan tek başına açılır
  if (path === '/admin') {
    return <Admin />;
  }

  let page = <HomePage />;
  if (path === '/kvkk') {
    page = <Kvkk />;
  } else if (path === '/sigorta-aktuel') {
    page = <SigortaAktuel />;
  } else if (path.startsWith('/sigorta-aktuel/')) {
    page = <SigortaAktuel slug={decodeURIComponent(path.slice('/sigorta-aktuel/'.length))} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <TickerBar />
      <Header />
      {page}
      <Footer />
    </div>
  );
}

export default App;
