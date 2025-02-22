import { useRef } from "react";
import { ContactSvg } from "./ContactSvg";
import { useGSAP } from "@gsap/react";

export const Contact = () => {
    const ref = useRef<SVGSVGElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;
        },
        { scope: ref },
    );

    return <ContactSvg ref={ref} />;
};
