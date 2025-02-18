import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { technologies, getTechName } from "../utils/lib.ts";

// TODO:
// Spawn falling squares with collision.
// Ability to move the collisions using mouse/pointer and dragging them.
// Create a physics force that pushes out blocks when click on location.
// Pick what I like.
// Add text/SVG to the blocks

export const FallingTech = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        return () => {};
    }, []);

    return <canvas ref={ref} className="aspect-video w-full" />;
};
