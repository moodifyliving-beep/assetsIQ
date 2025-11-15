"use client";

import Image from "next/image";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";

const properties = [
    {
        name: "Faena Residences Downtown Miami",
        image: "/images/icon1.jpg", // Placeholder - replace with actual property image
    },
    {
        name: "Raffles Residences The Palm",
        image: "/images/icon2.jpg", // Placeholder - replace with actual property image
    },
    {
        name: "Chelsea Residences",
        image: "/images/icon3.jpg", // Placeholder - replace with actual property image
    },
];

const PropertyCarousel = () => {
    return (
        <section className="relative w-full py-16 lg:py-24 overflow-hidden">
            {/* Blurred Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                    <div className="absolute inset-0 opacity-30">
                        <Image
                            src="/images/icon1.jpg"
                            alt="Background"
                            fill
                            className="object-cover blur-3xl scale-110"
                        />
                    </div>
                </div>
            </div>

            <Wrapper className="relative z-10">
                <AnimationContainer animation="fadeUp" delay={0.2}>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                            slidesToScroll: 1,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6">
                            {properties.map((property, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-2 md:pl-4 lg:pl-6 basis-[85%] sm:basis-[70%] md:basis-[60%] lg:basis-1/3"
                                >
                                    <div className="relative group">
                                        <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                                            <Image
                                                src={property.image}
                                                alt={property.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                            
                                            {/* Property Name */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-tight">
                                                    {property.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        {/* Navigation Arrows */}
                        <CarouselPrevious className="absolute left-2 sm:left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-md h-10 w-10 sm:h-12 sm:w-12 shadow-lg" />
                        <CarouselNext className="absolute right-2 sm:right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-md h-10 w-10 sm:h-12 sm:w-12 shadow-lg" />
                    </Carousel>
                </AnimationContainer>
            </Wrapper>
        </section>
    );
};

export default PropertyCarousel;

