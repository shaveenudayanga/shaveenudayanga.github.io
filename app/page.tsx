// app/page.tsx
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import BackToTop from "@/components/ui/BackToTop";
import Toast from "@/components/ui/Toast";
import CertificateModal from "@/components/ui/CertificateModal";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import BeyondTerminal from "@/components/sections/BeyondTerminal";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ChatWrapper from "@/components/ai/ChatWrapper";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <ScrollProgress />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <BeyondTerminal />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Toast />
      <CertificateModal />
      <ScrollAnimations />
      <ChatWrapper />
    </>
  );
}
