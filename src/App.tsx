import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Membership from './components/Membership';
import Specs from './components/Specs';
import Experience from './components/Experience';
import Locations from './components/Locations';
import Tournaments from './components/Tournaments';
import Testimonials from './components/Testimonials';
import Bistro from './components/Bistro';
import Concierge from './components/Concierge';
import SocialCTA from './components/SocialCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SocialBar from './components/SocialBar';
import SectionDivider from './components/SectionDivider';

export default function App() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <Hero />
      <SectionDivider />
      <Membership />
      <SectionDivider />
      <Tournaments />
      <SectionDivider />
      <Specs />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Locations />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Bistro />
      <SectionDivider />
      <Concierge />
      <SocialCTA />
      <Footer />
      <WhatsAppButton />
      <SocialBar />
    </div>
  );
}
