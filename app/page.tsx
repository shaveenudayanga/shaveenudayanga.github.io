// app/page.tsx
import SheetIndex from "@/components/sheet/SheetIndex";
import TitleBlock from "@/components/sheet/TitleBlock";
import Reveal from "@/components/sheet/Reveal";
import Opening from "@/components/sections/Opening";
import Studio from "@/components/sections/Studio";
import Work from "@/components/sections/Work";
import Record from "@/components/sections/Record";
import Spec from "@/components/sections/Spec";
import Contact from "@/components/sections/Contact";
import ChatWrapper from "@/components/ai/ChatWrapper";

export default function Home() {
  return (
    <div className="page">
      <SheetIndex />
      <main id="main-content">
        <Opening />
        <Studio />
        <Work />
        <Record />
        <Spec />
        <Contact />
      </main>
      <TitleBlock />
      <Reveal />
      <ChatWrapper />
    </div>
  );
}
