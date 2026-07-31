import ContactMap from "./components/ContactMap";
import CtaBand from "./components/CtaBand";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import MobileBar from "./components/MobileBar";
import Nav from "./components/Nav";
import Process from "./components/Process";
import QuoteForm from "./components/QuoteForm";
import SectionHead from "./components/SectionHead";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import TintSimulator from "./components/TintSimulator";
import WhyGkm from "./components/WhyGkm";
import { QuoteProvider } from "./lib/quote-store";

export default function App() {
  return (
    <QuoteProvider>
      <Nav />

      <main id="icerik">
        <Hero />
        <Services />
        <TintSimulator />
        <Gallery />
        <WhyGkm />
        <Testimonials />
        <Faq />

        {/* ----------------------------------------- Süreç + fiyat formu */}
        <section id="fiyat-al" className="band border-t border-edge bg-ink-2">
          <div className="shell">
            <SectionHead
              label="Fiyat al"
              title={
                <>
                  Dört adım, <span className="text-amber">tek mesaj</span>
                </>
              }
              lead="Fiyat, aracın cam ölçüsüne ve seçilen ürüne göre değişir. Bu yüzden liste yerine aracınıza özel rakam veriliyor — formu doldurun, gerisini GKM yazsın."
            />

            <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <Process className="lg:col-span-5" />
              <QuoteForm className="lg:col-span-7" />
            </div>
          </div>
        </section>

        <ContactMap />
        <CtaBand />
      </main>

      <Footer />
      <MobileBar />
    </QuoteProvider>
  );
}
