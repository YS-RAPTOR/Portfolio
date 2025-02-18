import { useRef } from "react";
import { technologies, getTechName } from "../utils/lib.ts";

export const FallingTech = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    return <canvas ref={ref} className="aspect-video w-full" />;
};
