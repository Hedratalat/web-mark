import { lazy, Suspense } from "react";
import CategoryCard from "../components/CategoryCard/CategoryCard";

const Navbar = lazy(() => import("../components/Navbar/Navbar"));
const HeroSection = lazy(
  () => import("../components/HeroSection/HeroSecction"),
);
const AboutSection = lazy(
  () => import("../components/AboutSection/AboutSection"),
);

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CategoryCard />
    </Suspense>
  );
}
