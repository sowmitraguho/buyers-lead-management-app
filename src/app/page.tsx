import AboutSection from "@/components/Home/AboutSection";
import AuthenticatedBuyers from "@/components/Home/AuthenticatedBuyers";
import CallToAction from "@/components/Home/CallToAction";
import FeaturedProperties from "@/components/Home/featuredProperties";
import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServiceSection";
import Testimonials from "@/components/Home/Testimonial";


export default function Home() {
  return (
    <>
      <main className="bg-gray-50 dark:bg-gray-900">
      <HeroSection />
      <FeaturedProperties />
      <AuthenticatedBuyers />
      <AboutSection />
      <ServicesSection />
      <Testimonials />
      <CallToAction />
      </main>
    </>
  );
}
