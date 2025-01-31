import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const Test = () => {
    const arr: { n: number }[] = [];

    useGSAP(() => {
        for (let i = 0; i < 25; i++) {
            arr.push({ n: 0 });
        }

        gsap.to(arr, {
            n: 100,
            stagger: {
                grid: [5, 5],
                each: 10,
                ease: "power2.out",
                from: "center",
            },
            onUpdate: () => {
                let rowStr = "";
                for (let i = 0; i < arr.length; i++) {
                    if (i % 5 === 0) {
                        rowStr += "\n";
                    }
                    rowStr += arr[i].n.toFixed(2) + " ";
                }
                console.log(rowStr);
            },
        });
    });

    return <div></div>;
};
