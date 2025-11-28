"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface Testimonial {
    company?: string;
    avatar: string;
    name: string;
    role: string;
    review: string;
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    testimonials: Testimonial[];
}

export const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
    ({ className, testimonials, ...props }, ref) => {
        const [api, setApi] = React.useState<CarouselApi>();
        const [current, setCurrent] = React.useState(0);

        React.useEffect(() => {
            if (!api) return;
            api.on("select", () => {
                setCurrent(api.selectedScrollSnap());
            });
        }, [api]);

        // Auto-scroll effect
        React.useEffect(() => {
            if (!api) return;

            const intervalId = setInterval(() => {
                api.scrollNext();
            }, 5000); // Auto-scroll every 5 seconds

            return () => clearInterval(intervalId);
        }, [api]);

        return (
            <div ref={ref} className={cn("py-16 pb-4", className)} {...props}>
                <Carousel
                    setApi={setApi}
                    className="max-w-screen-xl mx-auto px-4 lg:px-8"
                    opts={{ loop: true }}
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem
                                key={index}
                                className="flex flex-col items-center cursor-grab pb-4"
                            >
                                <p className="max-w-xl text-balance text-center text-xl sm:text-2xl font-light text-foreground leading-relaxed">
                                    "{testimonial.review}"
                                </p>
                                <h5 className="mt-8 font-medium text-primary">
                                    {testimonial.name}
                                </h5>
                                <h5 className="mt-1.5 font-light text-muted-foreground">
                                    {testimonial.role}
                                </h5>
                                <div className="mt-5 relative size-14 rounded-full overflow-hidden bg-muted ring-2 ring-accent/20">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "size-2 rounded-full transition-all duration-300",
                                    index === current
                                        ? "bg-[#6B5945] scale-110"
                                        : "bg-[#D4B896] hover:bg-[#C4A886]"
                                )}
                                onClick={() => api?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);

TestimonialCarousel.displayName = "TestimonialCarousel";
