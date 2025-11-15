"use client";

import { Check, Shield, FileCheck, BadgeCheck, Network, Umbrella } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import { Card, CardContent } from "./ui/card";

const SecurityTrust = () => {
    const shieldRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!shieldRef.current) return;

        const rect = shieldRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const securityFeatures = [
        {
            title: "Smart Contract Audited",
            description: "All smart contracts independently audited by top security firms",
            icon: FileCheck,
        },
        {
            title: "Whitelisted NFTs",
            description: "Curated property NFTs with verified ownership and legal standing",
            icon: BadgeCheck,
        },
        {
            title: "On-Chain Transparency",
            description: "Every transaction recorded immutably on the blockchain",
            icon: Network,
        },
        {
            title: "Insurance Coverage",
            description: "Underlying properties covered by comprehensive insurance",
            icon: Umbrella,
        },
    ];

    return (
        <Wrapper className="py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Side - Security Features */}
                <div className="flex flex-col gap-8">
                    <AnimationContainer animation="fadeUp" delay={0.2}>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                                Security & Trust
                            </h2>
                            <p className="text-base lg:text-lg text-muted-foreground max-w-xl">
                                Your investments are protected by industry-leading security practices and compliance frameworks.
                            </p>
                        </div>
                    </AnimationContainer>

                    <div className="flex flex-col gap-6">
                        {securityFeatures.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <AnimationContainer key={index} animation="fadeUp" delay={0.3 + index * 0.1}>
                                    <div className="flex gap-4 items-start group">
                                        <div className="flex-shrink-0 mt-1">
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-sm group-hover:shadow-md"
                                            >
                                                <IconComponent className="w-6 h-6 text-primary" />
                                            </motion.div>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h3 className="text-lg font-semibold">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </AnimationContainer>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side - Security Rating Card with 3D Shield */}
                <AnimationContainer animation="fadeRight" delay={0.4}>
                    <Card className="relative overflow-hidden border-2 bg-card/50 backdrop-blur-sm shadow-xl">
                        <CardContent className="p-8 lg:p-10">
                            <div className="flex flex-col items-center text-center gap-6">
                                {/* 3D Shield */}
                                <div
                                    ref={shieldRef}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    className="relative w-32 h-32 lg:w-40 lg:h-40 cursor-pointer"
                                >
                                    <motion.div
                                        style={{
                                            rotateX,
                                            rotateY,
                                            transformStyle: "preserve-3d",
                                        }}
                                        className="relative w-full h-full"
                                    >
                                        {/* Shield Base */}
                                        <motion.div
                                            initial={{ scale: 0, rotateY: -180, opacity: 0 }}
                                            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 20,
                                            }}
                                            className="absolute inset-0"
                                            style={{
                                                transformStyle: "preserve-3d",
                                            }}
                                        >
                                            {/* Shield Outer Glow - Multiple Layers */}
                                            <div className="absolute -inset-4 rounded-t-full bg-gradient-to-b from-primary/30 via-primary/15 to-transparent blur-2xl" />
                                            <div className="absolute -inset-2 rounded-t-full bg-gradient-to-b from-primary/20 via-primary/10 to-transparent blur-xl" />
                                            
                                            {/* Shield Main Body */}
                                            <div className="absolute inset-0 rounded-t-full bg-gradient-to-br from-primary via-primary/95 to-primary/85 shadow-[0_0_40px_hsl(var(--primary)/0.5),inset_0_2px_20px_rgba(255,255,255,0.3)] border-4 border-primary/40">
                                                {/* Shield Inner Highlight */}
                                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3/4 h-3/4 rounded-t-full bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
                                                
                                                {/* Shield Crest/Design with Glow */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.05, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                        }}
                                                    >
                                                        <Shield className="w-12 h-12 lg:w-16 lg:h-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" fill="currentColor" />
                                                    </motion.div>
                                                </div>
                                                
                                                {/* Shield Bottom Point */}
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] lg:border-l-[24px] border-r-[20px] lg:border-r-[24px] border-t-[30px] lg:border-t-[36px] border-l-transparent border-r-transparent border-t-primary shadow-lg" />
                                                
                                                {/* Shield Depth Shadow */}
                                                <div className="absolute inset-0 rounded-t-full bg-gradient-to-br from-black/20 via-transparent to-transparent" />
                                            </div>

                                            {/* Animated Rings - Pulsing Effect */}
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.15, 1],
                                                    opacity: [0.6, 0.9, 0.6],
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute inset-0 rounded-t-full border-2 border-primary/50"
                                            />
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.25, 1],
                                                    opacity: [0.4, 0.7, 0.4],
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: 0.3,
                                                }}
                                                className="absolute inset-0 rounded-t-full border-2 border-primary/40"
                                            />
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.35, 1],
                                                    opacity: [0.2, 0.5, 0.2],
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: 0.6,
                                                }}
                                                className="absolute inset-0 rounded-t-full border-2 border-primary/30"
                                            />
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Rating Text */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-center gap-3">
                                        <Shield className="w-5 h-5 text-primary" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Security Rating
                                        </span>
                                    </div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                        className="text-4xl lg:text-5xl font-bold"
                                    >
                                        Grade A+
                                    </motion.h3>
                                </div>

                                {/* Verification Details */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="text-sm text-muted-foreground max-w-sm leading-relaxed"
                                >
                                    Verified through Chainalysis screening, Certora formal verification, and continuous monitoring by our security team.
                                </motion.p>
                            </div>
                        </CardContent>
                    </Card>
                </AnimationContainer>
            </div>
        </Wrapper>
    );
};

export default SecurityTrust;

