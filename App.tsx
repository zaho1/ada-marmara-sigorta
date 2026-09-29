import TickerBar from '@/components/TickerBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InsuranceTypes from '@/components/InsuranceTypes';
import Partners from '@/components/Partners';
import TrustBadges from '@/components/TrustBadges';
import InsuranceGuide from '@/components/InsuranceGuide';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import About from '@/components/About';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <TickerBar />
      <Header />
      <main>
        <Hero />
        <InsuranceTypes />
        <Partners />
        <TrustBadges />
        <InsuranceGuide />
        <Testimonials />
        <FAQ />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
