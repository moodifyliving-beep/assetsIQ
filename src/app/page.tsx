"use client";

import CTA from "@/components/cta";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Perks from "@/components/perks";
import PlatformMetrics from "@/components/platform-metrics";
import Pricing from "@/components/pricing";
import SecurityTrust from "@/components/security-trust";
import Testimonials from "@/components/testimonials";
import VideoHero from "@/components/video-hero";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const HomePage = () => {
    return (
        <main className="w-full relative min-h-screen">
            <Navbar />
            <div className="w-full relative flex flex-col">
                <section className="w-full relative z-0">
                    <VideoHero />
                </section>

                <section className="w-full relative z-10">
                    <Perks />
                </section>

                <section className="w-full relative z-10">
                    <Hero />
                </section>

                <section className="w-full relative z-10">
                    <HowItWorks />
                </section>

                <section className="w-full relative z-10">
                    <Features />
                </section>

                <section className="w-full relative z-10">
                    <Testimonials />
                </section>

                <section className="w-full relative z-10">
                    <Pricing />
                </section>

                <section className="w-full relative z-10">
                    <PlatformMetrics />
                </section>

                <section className="w-full relative z-10">
                    <SecurityTrust />
                </section>

                <section className="w-full relative z-10">
                    <FAQ />
                </section>

                <section className="w-full relative z-10">
                    <CTA />
                </section>
            </div>
            <Footer />
        </main>
    );
};

export default HomePage;
