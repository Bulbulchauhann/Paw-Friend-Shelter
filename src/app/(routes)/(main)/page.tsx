import {
  AboutSection,
  HeroSection,
  SheltorSupportSection,
} from "./_components";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />

      <AboutSection />

      <SheltorSupportSection />
    </main>
  );
}
