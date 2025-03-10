import { useRef } from "react";
import { ContactSvg } from "./ContactSvg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { element } from "three/src/nodes/TSL.js";

function isWebKit() {
    const ua = navigator.userAgent;
    // As far as I can tell, Chromium-based desktop browsers are the only browsers
    // that pretend to be WebKit-based but aren't.
    return (
        (/AppleWebKit/.test(ua) && !/Chrome/.test(ua)) ||
        /\b(iPad|iPhone|iPod)\b/.test(ua)
    );
}

type GradientDefinition = (string | { color: string; stop: number })[];

const ContactConstants = {
    start: {
        durationMultiplier: 0.0025,
        ease: "power1.out",
    },
    idle: {
        pulseLength: 25,
        durationMultiplier: 0.002,
    },
    gradients: {
        mail: [
            "#c5211f",
            "#ea4235",
            "#fabd03",
            "#34a853",
            "#4081ec",
        ] as GradientDefinition,
        linkedin: [
            { color: "#0077b5", stop: 0 },
            { color: "#cfedfb", stop: 0.8 },
            { color: "#ffffff", stop: 1 },
        ] as GradientDefinition,
        discord: ["#5865f2", "#1a1b1e"] as GradientDefinition,
        github: [
            { color: "#8250df", stop: 0 },
            { color: "#000aff", stop: 0.3 },
            { color: "#0d1117", stop: 1 },
        ] as GradientDefinition,
    },
};

const getColor = (gradient: GradientDefinition, offset: number) => {
    if (offset < 0 || offset > 1) {
        throw new Error("Offset must be between 0 and 1");
    }
    if (gradient.length === 0) {
        throw new Error("Gradient must have at least one color");
    }

    if (gradient.length === 1) {
        const color: string =
            typeof gradient[0] === "object" ? gradient[0].color : gradient[0];
        return color;
    }

    const stops: number[] = [];

    if (typeof gradient[0] === "object") {
        for (let i = 0; i < gradient.length; i++) {
            const { stop } = gradient[i] as { color: string; stop: number };
            stops.push(stop);
        }
    } else {
        const step = 1 / (gradient.length - 1);
        for (let i = 0; i < gradient.length; i++) {
            stops.push(step * i);
        }
    }

    // Check where I am in the gradient
    for (let i = 1; i < stops.length; i++) {
        if (offset >= stops[i - 1] && offset <= stops[i]) {
            const normalizedOffset =
                (offset - stops[i - 1]) / (stops[i] - stops[i - 1]);

            const color1 =
                typeof gradient[i - 1] === "string"
                    ? gradient[i - 1]
                    : // @ts-ignore
                      gradient[i - 1].color;
            const color2 =
                typeof gradient[i] === "string"
                    ? gradient[i]
                    : // @ts-ignore
                      gradient[i].color;

            return gsap.utils.interpolate(color1, color2, normalizedOffset);
        }
    }

    throw new Error("Offset not found in gradient");
};

const startingAnimation = (tl: gsap.core.Timeline) => {
    const negArray: SVGPathElement[] = gsap.utils.toArray(
        "#G-1>.trace, #G-2>.trace, #L>.trace, #D-1>.trace, #D-2>.trace, #M-1>.trace, #M-2>.trace",
    );
    const posArray: SVGPathElement[] = gsap.utils.toArray("#ET>.trace");

    const durationMaxNeg =
        Math.max(...negArray.map((s) => s.getTotalLength())) *
        ContactConstants.start.durationMultiplier;
    const durationMaxPos =
        Math.max(...posArray.map((s) => s.getTotalLength())) *
        ContactConstants.start.durationMultiplier;
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
                duration: ContactConstants.start.durationMultiplier * length,
                ease: ContactConstants.start.ease,
                strokeDashoffset: 0,
            },
            durationMax - ContactConstants.start.durationMultiplier * length,
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
                duration: ContactConstants.start.durationMultiplier * length,
                ease: ContactConstants.start.ease,
                strokeDashoffset: 0,
            },
            durationMax - ContactConstants.start.durationMultiplier * length,
        );
    }
};

const pulseAnimation = (
    tl: gsap.core.Timeline,
    selector: string,
    gradient: GradientDefinition,
    reverse: boolean | "random",
    start: number,
    stagger: number,
    durationMultiplier: number = ContactConstants.idle.durationMultiplier,
) => {
    let paths = gsap.utils.toArray(selector) as SVGPathElement[];
    if (reverse === "random") {
        paths = gsap.utils.shuffle(paths);
    }

    for (let i = 0; i < paths.length; i++) {
        const pathLength = paths[i].getTotalLength();
        const stroke = getColor(gradient, i / paths.length);

        const reversed = reverse === "random" ? Math.random() > 0.5 : reverse;

        tl.set(
            paths[i],
            {
                strokeDasharray: `${ContactConstants.idle.pulseLength}px, ${pathLength}px`,
                strokeDashoffset: reversed
                    ? pathLength + ContactConstants.idle.pulseLength * 2.1
                    : ContactConstants.idle.pulseLength,
                stroke: stroke,
            },
            0,
        );

        tl.to(
            paths[i],
            {
                strokeDashoffset: reversed
                    ? ContactConstants.idle.pulseLength
                    : pathLength + ContactConstants.idle.pulseLength * 2.1,
                duration: durationMultiplier * pathLength,
                ease: "none",
            },
            start + i * stagger,
        );
    }
};

const repeatingAnimation = (tl: gsap.core.Timeline) => {
    pulseAnimation(
        tl,
        "#G-1>.pulse",
        ContactConstants.gradients.github,
        false,
        0,
        0.4,
    );
    pulseAnimation(
        tl,
        "#G-2>.pulse",
        ContactConstants.gradients.github,
        true,
        1.5,
        0.25,
    );
    pulseAnimation(
        tl,
        "#L>.pulse",
        ContactConstants.gradients.linkedin,
        "random",
        1,
        0.2,
    );
    pulseAnimation(
        tl,
        "#D-1>.pulse",
        ContactConstants.gradients.discord,
        false,
        0.25,
        0.2,
    );

    pulseAnimation(
        tl,
        "#D-2>.pulse",
        ContactConstants.gradients.discord,
        true,
        2,
        0.2,
    );
    pulseAnimation(
        tl,
        "#M-2>.pulse",
        ContactConstants.gradients.mail,
        false,
        0,
        0.2,
    );
    pulseAnimation(
        tl,
        "#M-1>.pulse",
        ContactConstants.gradients.mail,
        true,
        1,
        0.1,
    );
    pulseAnimation(tl, "#ET>.pulse", ["#c6c6c6"], "random", 0, 0.05, 0.005);
};

const createHoverAnimation = (group: SVGGElement) => {
    const shineElement = group.querySelector(".shine") as SVGRectElement;
    const iconBbox = (group.querySelector(".text") as SVGPathElement).getBBox();

    const data = {
        tl: gsap.timeline({
            paused: true,
            onComplete: () => {
                if (data.repeat) {
                    data.tl.seek(-0.5);
                    data.tl.play();
                }
            },
        }),
        repeat: false,
        element: group,
        onEnter: () => {
            data.repeat = true;
            data.tl.restart();
        },
        onLeave: () => {
            data.repeat = false;
        },
    };

    const scale = 1.2;

    const cx = iconBbox.x + iconBbox.width / 2;
    const cy = iconBbox.y + iconBbox.height / 2;

    const x1 = cx + iconBbox.width * scale;
    const y1 = cy - iconBbox.height * scale;
    const x2 = cx - iconBbox.width * scale;
    const y2 = cy + iconBbox.height * scale;

    data.tl.fromTo(
        shineElement,
        {
            attr: {
                x1: x1 - iconBbox.width * 1.41,
                x2: x2 - iconBbox.width * 1.41,
                y1: y1,
                y2: y2,
            },
        },
        {
            duration: 2,
            ease: "sine.inOut",
            attr: {
                x1: x1 + iconBbox.width * 1.41,
                x2: x2 + iconBbox.width * 1.41,
                y1: y1,
                y2: y2,
            },
        },
        0,
    );

    return data;
};

export const Contact = () => {
    const ref = useRef<SVGSVGElement>(null);
    const toastRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP(
        () => {
            if (!ref.current || !toastRef.current) return;

            const rtl = gsap.timeline({
                repeat: -1,
                repeatDelay: 0.1,
                paused: true,
            });
            repeatingAnimation(rtl);

            if (!isWebKit()) {
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
            } else {
                rtl.play();
            }

            const mail = createHoverAnimation(
                ref.current.querySelector("#Mail") as SVGGElement,
            );
            mail.element.addEventListener("pointerenter", mail.onEnter);
            mail.element.addEventListener("pointerleave", mail.onLeave);

            const linkedin = createHoverAnimation(
                ref.current.querySelector("#Linkedin") as SVGGElement,
            );
            linkedin.element.addEventListener("pointerenter", linkedin.onEnter);
            linkedin.element.addEventListener("pointerleave", linkedin.onLeave);

            const github = createHoverAnimation(
                ref.current.querySelector("#Github") as SVGGElement,
            );
            github.element.addEventListener("pointerenter", github.onEnter);
            github.element.addEventListener("pointerleave", github.onLeave);

            const discord = createHoverAnimation(
                ref.current.querySelector("#Discord") as SVGGElement,
            );
            discord.element.addEventListener("pointerenter", discord.onEnter);
            discord.element.addEventListener("pointerleave", discord.onLeave);

            // Toast Timeline
            const toastTl = gsap.timeline({
                paused: true,
            });
            toastTl.fromTo(
                toastRef.current,
                {
                    display: "block",
                    opacity: 0,
                    yPercent: 100,
                    scale: 0.8,
                },
                {
                    ease: "elastic.out(1, 1)",
                    opacity: 1,
                    yPercent: 0,
                    scale: 1,
                    duration: 1,
                },
            );
            toastTl.to(
                toastRef.current,
                {
                    scale: 0,
                    opacity: 0,
                    ease: "expo.out",
                    display: "none",
                },
                0.75,
            );

            const toastClick = () => {
                toastTl.restart();
                window.navigator.clipboard.writeText("ys_raptor");
            };

            discord.element.parentElement!.addEventListener(
                "click",
                toastClick,
            );

            return () => {
                mail.element.removeEventListener("pointerenter", mail.onEnter);
                mail.element.removeEventListener("pointerleave", mail.onLeave);

                linkedin.element.removeEventListener(
                    "pointerenter",
                    linkedin.onEnter,
                );
                linkedin.element.removeEventListener(
                    "pointerleave",
                    linkedin.onLeave,
                );

                github.element.removeEventListener(
                    "pointerenter",
                    github.onEnter,
                );
                github.element.removeEventListener(
                    "pointerleave",
                    github.onLeave,
                );

                discord.element.removeEventListener(
                    "pointerenter",
                    discord.onEnter,
                );
                discord.element.removeEventListener(
                    "pointerleave",
                    discord.onLeave,
                );

                // Toast Click
                discord.element.parentElement!.removeEventListener(
                    "click",
                    toastClick,
                );
            };
        },
        { scope: ref },
    );

    return (
        <>
            <ContactSvg ref={ref} />
            <div
                ref={toastRef}
                className="fixed bottom-5 right-5 hidden border bg-zinc-950 p-2 text-xs"
            >
                <h1 className="font-bold">Discord Username Copied!</h1>
                <p>ys_raptor</p>
            </div>
        </>
    );
};
