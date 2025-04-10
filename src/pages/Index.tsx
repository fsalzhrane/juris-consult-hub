
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import LawyerShowcase from "@/components/home/LawyerShowcase";
import AiChatbotPreview from "@/components/home/AiChatbotPreview";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <LawyerShowcase />
      <AiChatbotPreview />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
