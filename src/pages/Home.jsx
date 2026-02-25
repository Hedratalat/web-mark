import { lazy, Suspense } from "react";

const Navbar = lazy(() => import("../components/Navbar/Navbar"));
const HeroSection = lazy(
  () => import("../components/HeroSection/HeroSecction"),
);
const AboutSection = lazy(
  () => import("../components/AboutSection/AboutSection"),
);
const CategoryCard = lazy(
  () => import("../components/CategoryCard/CategoryCard"),
);
const ContactUs = lazy(() => import("../components/ContactUS/ContactUS"));
const Footer = lazy(() => import("../components/Footer/Footer"));

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CategoryCard />
      <ContactUs />
      <Footer />
    </Suspense>
  );
}
