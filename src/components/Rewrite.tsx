import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { context } from "three/src/nodes/TSL.js";

export const Rewrite = (props: {
    titles: string[];
    inbetween: string;
    className?: string;
}) => {
    const ref = useRef<HTMLSpanElement | null>(null);

    useGSAP(
        (context) => {
            context.add(() => {
                const tl = gsap.timeline({ repeat: -1 });

                for (let i = 0; i < props.titles.length; i++) {
                    tl.to(
                        ref.current,
                        {
                            duration: 0.5,
                            ease: "sine.out",
                            text: {
                                value: props.inbetween,
                                rtl: true,
                            },
                        },
                        "+=1.5",
                    ).to(
                        ref.current,
                        {
                            duration: 0.5,
                            ease: "sine.in",
                            text: props.titles[(i + 1) % props.titles.length],
                        },
                        "+=0.1",
                    );
                }
            });

            return () => {
                context.revert();
            };
        },

        [props.titles],
    );

    return (
        <span className={props.className} ref={ref}>
            {props.titles[0]}
        </span>
    );
};
