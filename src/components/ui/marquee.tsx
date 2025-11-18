import { cn } from "@/lib";
import { ComponentPropsWithoutRef, cloneElement, isValidElement, Children } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
    /**
     * Optional CSS class name to apply custom styles
     */
    className?: string;
    /**
     * Whether to reverse the animation direction
     * @default false
     */
    reverse?: boolean;
    /**
     * Whether to pause the animation on hover
     * @default false
     */
    pauseOnHover?: boolean;
    /**
     * Content to be displayed in the marquee
     */
    children: React.ReactNode;
    /**
     * Whether to animate vertically instead of horizontally
     * @default false
     */
    vertical?: boolean;
    /**
     * Number of times to repeat the content
     * @default 4
     */
    repeat?: number;
}

export default function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
}: MarqueeProps) {
    return (
        <div
            {...props}
            className={cn(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                {
                    "flex-row": !vertical,
                    "flex-col": vertical,
                },
                className,
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, repeatIndex) => (
                    <div
                        key={`marquee-repeat-${repeatIndex}`}
                        className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                            "animate-marquee flex-row": !vertical,
                            "animate-marquee-vertical flex-col": vertical,
                            "group-hover:[animation-play-state:paused]": pauseOnHover,
                            "[animation-direction:reverse]": reverse,
                        })}
                    >
                        {Children.map(children, (child, childIndex) => {
                            if (isValidElement(child)) {
                                // Clone child with a unique key that includes the repeat index
                                // Always create a unique key combining repeat index and child index
                                const originalKey = child.key;
                                const uniqueKey = originalKey != null && originalKey !== ''
                                    ? `marquee-r${repeatIndex}-c${childIndex}-${String(originalKey)}` 
                                    : `marquee-r${repeatIndex}-c${childIndex}`;
                                
                                // Create a new element with the unique key
                                return cloneElement(child, {
                                    key: uniqueKey,
                                } as any);
                            }
                            // For non-element children (text, numbers, etc.), wrap them with a unique key
                            if (child != null && child !== false) {
                                return (
                                    <span key={`marquee-r${repeatIndex}-t${childIndex}`} style={{ display: 'contents' }}>
                                        {child}
                                    </span>
                                );
                            }
                            return null;
                        })}
                    </div>
                ))}
        </div>
    );
};
