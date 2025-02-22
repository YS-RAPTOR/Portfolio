import { useRef } from "react";
import { ContactSvg } from "./ContactSvg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const startingAnimation = (tl: gsap.core.Timeline) => {
    const durationMultiplier = 0.0025;
    // const durationMultiplier = 0.00025;
    const ease = "power1.out";

    const negArray: SVGPathElement[] = gsap.utils.toArray(
        "#G-1>.trace, #G-2>.trace, #L>.trace, #D-1>.trace, #D-2>.trace, #M-1>.trace, #M-2>.trace",
    );
    const posArray: SVGPathElement[] = gsap.utils.toArray("#ET>.trace");

    const durationMaxNeg =
        Math.max(...negArray.map((s) => s.getTotalLength())) *
        durationMultiplier;
    const durationMaxPos =
        Math.max(...posArray.map((s) => s.getTotalLength())) *
        durationMultiplier;
    const durationMax = Math.max(durationMaxPos, durationMaxNeg);

    for (let i = 0; i < negArray.length; i++) {
        const length = negArray[i].getTotalLength();

        tl.fromTo(
            negArray[i],
            {
                strokeDasharray: length,
                strokeDashoffset: -length,
            },
            {
                duration: durationMultiplier * length,
                ease: ease,
                strokeDashoffset: 0,
            },
            durationMax - durationMultiplier * length,
        );
    }

    for (let i = 0; i < posArray.length; i++) {
        const length = posArray[i].getTotalLength();

        tl.fromTo(
            posArray[i],
            {
                strokeDasharray: length,
                strokeDashoffset: length,
            },
            {
                duration: durationMultiplier * length,
                ease: ease,
                strokeDashoffset: 0,
            },
            durationMax - durationMultiplier * length,
        );
    }
};

const pulseAnimation = (
    tl: gsap.core.Timeline,
    selector: string,
    stroke: string,
) => {
    const pulses: SVGPathElement[] = gsap.utils.toArray(selector);
    const pulseLength = 25;

    for (let i = 0; i << pulses.length; i++) {
        const path = pulses[i];
        const pathLength = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: `${pulseLength}px, ${pathLength}px`,
            strokeDashoffset: pulseLength,
            stroke: stroke,
        });

        tl.t;
    }
};

const repeatingAnimation = (tl: gsap.core.Timeline) => {
    const allPulses: SVGPathElement[] = gsap.utils.toArray(".pulse");
    const pulseLength = 50;

    for (let i = 0; i < allPulses.length; i++) {
        const l = allPulses[i].getTotalLength();

        gsap.set(allPulses[i], {
            strokeDasharray: `${pulseLength}px, ${l}px`,
            strokeDashoffset: pulseLength,
            stroke: "rgba(0,0,0,0)",
        });

        // tl.to(
        //     allPulses[i],
        //     {
        //         strokeDashoffset: l + pulseLength * 2,
        //         duration: 1,
        //         ease: "none",
        //     },
        //     0,
        // );
    }
};

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
