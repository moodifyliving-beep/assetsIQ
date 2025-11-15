"use client";

import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import { Button } from "./ui/button";

const CryptoSection = () => {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Image Background */}
            <div className="absolute inset-0">
                <Image
                    src="/images/icon1.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-900/75"></div>
            </div>

            <Wrapper className="relative py-16 lg:py-24">
                <div className="max-w-3xl mx-auto">
                    {/* Content - Centered */}
                    <div className="relative z-10 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
                        <AnimationContainer animation="fadeUp" delay={0.3}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-2xl lg:text-3xl font-semibold text-white drop-shadow-lg font-phonk">AssetsIQ</div>
                            </div>
                        </AnimationContainer>

                        <AnimationContainer animation="fadeUp" delay={0.4}>
                            <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg font-phonk">
                                Get started with
                                <br />
                                <span className="text-white">AssetsIQ </span>
                                <br />
                                <span className="text-slate-200">Fractional Trading</span>
                            </h2>
                        </AnimationContainer>

                        <AnimationContainer animation="fadeUp" delay={0.5}>
                            <p className="text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl drop-shadow-md">
                                Start with as little as $1. Buy, sell, and transfer BTC, ETH, XRP, SOL, DOGE, SHIB, and more.
                            </p>
                        </AnimationContainer>

                        <AnimationContainer animation="fadeUp" delay={0.6}>
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <Info className="w-4 h-4" />
                                <span>Crypto Risk Disclosures</span>
                            </div>
                        </AnimationContainer>

                        <AnimationContainer animation="fadeUp" delay={0.7}>
                            <Link href="/">
                                <Button 
                                    size="lg" 
                                    className="bg-white text-slate-900 hover:bg-slate-100 rounded-lg px-8 py-6 text-base font-medium transition-colors shadow-xl hover:shadow-2xl"
                                >
                                    Learn more
                                </Button>
                            </Link>
                        </AnimationContainer>

                        <AnimationContainer animation="fadeUp" delay={0.8}>
                            <p className="text-xs text-slate-400 mt-2">
                                Crypto offered through AssetsIQ Crypto.
                            </p>
                        </AnimationContainer>
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default CryptoSection;

