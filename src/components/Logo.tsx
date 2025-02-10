import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const yPercentage = 150;
const xPercentage = yPercentage;
const ease = "elastic.out(1, 0.75)";
const duration = 2;
const position = "<20%";

// NOTE: Total animation is 4.2 seconds
export const Logo = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(".part", {
                        ease: "sine.inOut",
                        yPercent: () => {
                            const value = Math.random() * 2 + 2;
                            const sign = Math.random() > 0.5 ? 1 : -1;
                            return sign * value;
                        },
                        duration: "random(1, 2.5, 0.01)",
                        stagger: {
                            each: 0.5,
                            yoyo: true,
                            repeat: -1,
                        },
                    });
                },
            });

            tl.from(".bl", {
                delay: 0.2,
                yPercent: yPercentage,
                ease: ease,
                duration: duration,
            });

            tl.from(
                ".br",
                {
                    yPercent: yPercentage,
                    ease: ease,
                    duration: duration,
                },
                position,
            );

            tl.from(
                ".rr",
                {
                    yPercent: -yPercentage,
                    xPercent: xPercentage,
                    ease: ease,
                    duration: duration,
                },
                position,
            );
            tl.from(
                ".rl",
                {
                    yPercent: -yPercentage,
                    xPercent: xPercentage,
                    ease: ease,
                    duration: duration,
                },
                position,
            );
            tl.from(
                ".lr",
                {
                    yPercent: -yPercentage,
                    xPercent: -xPercentage,
                    ease: ease,
                    duration: duration,
                },
                position,
            );

            tl.from(
                ".ll",
                {
                    yPercent: -yPercentage,
                    xPercent: -xPercentage,
                    ease: ease,
                    duration: duration,
                },
                position,
            );
            tl.from(
                ref.current,
                {
                    duration: 0.5,
                    borderColor: "#09090b",
                },
                position,
            );
        },
        { scope: ref },
    );

    return (
        <div
            ref={ref}
            className="flex h-20 w-20 items-center justify-center overflow-clip rounded-full border-2 bg-zinc-950 p-5"
        >
            <svg
                id="Layer_2"
                data-name="Layer 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 435.57 727.32"
            >
                <g id="Base_Logo_Light" data-name="Base Logo Light">
                    <g>
                        <polygon
                            className="part br fill-zinc-50 will-change-transform"
                            points="220.83 331.94 240.83 297.29 240.83 666.77 220.83 632.13 220.83 331.94"
                        />
                        <polygon
                            className="part bl fill-zinc-50 will-change-transform"
                            points="210.83 392.49 190.83 357.85 190.83 727.32 210.83 692.68 210.83 392.49"
                        />
                        <polygon
                            className="part ll fill-zinc-50 will-change-transform"
                            points="0 67.32 0 27.32 184.74 347.29 150.1 327.29 0 67.32"
                        />
                        <polygon
                            className="part lr fill-zinc-50 will-change-transform"
                            points="210.83 332.49 210.83 372.49 26.09 52.51 60.73 72.51 210.83 332.49"
                        />
                        <polygon
                            className="part rr fill-zinc-50 will-change-transform"
                            points="435.57 60 435.57 20 250.83 339.97 285.47 319.97 435.57 60"
                        />
                        <polygon
                            className="part rl fill-zinc-50 will-change-transform"
                            points="250.83 279.97 250.83 319.97 435.57 0 400.93 20 250.83 279.97"
                        />
                    </g>
                </g>
            </svg>
        </div>
    );
};
