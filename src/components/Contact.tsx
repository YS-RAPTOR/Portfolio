import { useRef } from "react";
import { ContactSvg } from "./ContactSvg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const startingAnimation = (tl: gsap.core.Timeline) => {
    const durationMultiplier = 0.0025;
    const durationMax = 1000 * durationMultiplier;
    const ease = "power1.out";

    tl.fromTo(
        "#G-1>.trace",
        { strokeDasharray: 600, strokeDashoffset: -600 },
        {
            duration: durationMultiplier * 600,
            strokeDashoffset: 0,
            ease: ease,
        },
        durationMax - durationMultiplier * 600,
    );
    tl.fromTo(
        "#G-2>.trace",
        { strokeDasharray: 450, strokeDashoffset: -450 },
        {
            duration: durationMultiplier * 450,
            strokeDashoffset: 0,
            ease: ease,
        },
        durationMax - durationMultiplier * 450,
    );
    tl.fromTo(
        "#L>.trace",
        { strokeDasharray: 200, strokeDashoffset: -200 },
        {
            duration: durationMultiplier * 200,
            strokeDashoffset: 0,
            ease: ease,
        },
        durationMax - durationMultiplier * 200,
    );
    tl.fromTo(
        "#D-1>.trace",
        { strokeDasharray: 700, strokeDashoffset: -700 },
        {
            duration: durationMultiplier * 700,
            strokeDashoffset: 0,
            ease: ease,
        },
        durationMax - durationMultiplier * 700,
    );
    tl.fromTo(
        "#D-2>.trace",
        { strokeDasharray: 150, strokeDashoffset: -150 },
        {
            duration: durationMultiplier * 150,
            strokeDashoffset: 0,
            ease: ease,
        },
        durationMax - durationMultiplier * 150,
    );
    tl.fromTo(
        "#M-1>.trace",
        { strokeDasharray: 900, strokeDashoffset: -900 },
        {
            duration: durationMultiplier * 900,
            strokeDashoffset: 0,
            ease: ease,
        },
        durationMax - durationMultiplier * 900,
    );
    tl.fromTo(
        "#M-2>.trace",
        { strokeDasharray: 450, strokeDashoffset: -450 },
        {
            duration: durationMultiplier * 450,
            strokeDashoffset: 0,
            ease: ease,
        },
        durationMax - durationMultiplier * 450,
    );
    tl.fromTo(
        "#ET>.trace",
        { strokeDasharray: 450, strokeDashoffset: 450 },
        {
            duration: durationMultiplier * 450,
            strokeDashoffset: 0,
            ease: ease,
        },
        durationMax - durationMultiplier * 450,
    );
};

const repeatingAnimation = (tl: gsap.core.Timeline) => {};

export const Contact = () => {
    const ref = useRef<SVGSVGElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;

            const rtl = gsap.timeline({
                repeat: -1,
                repeatDelay: 1,
                paused: true,
            });
            repeatingAnimation(rtl);

            const tl = gsap.timeline({
                paused: true,
                onComplete: () => {
                    rtl.play();
                },
            });
            startingAnimation(tl);

            new IntersectionObserver(
                (entries, observer) => {
                    for (let i = 0; i < entries.length; i++) {
                        if (entries[i].isIntersecting) {
                            tl.play();
                            observer.unobserve(entries[i].target);
                        }
                    }
                },
                { threshold: 0.8 },
            ).observe(ref.current);
        },
        { scope: ref },
    );

    return <ContactSvg ref={ref} />;
};

// MAIL GRADIENT
// background: rgb(197,33,31);
// background: linear-gradient(90deg, rgba(197,33,31,1) 0%, rgba(234,66,53,1) 25%, rgba(250,189,3,1) 50%, rgba(52,168,83,1) 75%, rgba(66,134,245,1) 100%);

// LINKEDIN GRADIENT
// background: rgb(0,119,181);
// background: linear-gradient(90deg, rgba(0,119,181,1) 0%, rgba(207,237,251,1) 80%, rgba(255,255,255,1) 100%);

// DISCORD GRADIENT
// background: rgb(88,101,242);
// background: linear-gradient(90deg, rgba(88,101,242,1) 0%, rgba(26,27,30,1) 100%);

// GITHUB GRADIENT
// background: rgb(130,80,223);
// background: linear-gradient(90deg, rgba(130,80,223,1) 0%, rgba(0,10,255,1) 30%, rgba(13,17,23,1) 100%);
