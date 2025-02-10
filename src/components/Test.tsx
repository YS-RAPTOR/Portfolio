import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useState } from "react";

export const Test = () => {
    const initialRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    const [prevState, setPrevState] = useState("HELLO");
    const [state, setState] = useState("WORLD");

    const swap = (newState: string) => {
        setPrevState(state);
        setState(newState);
    };

    useGSAP(() => {
        const tl = gsap.timeline();

        //global tween settings
        const duration = 0.4;
        if (!initialRef.current || !ref.current) return;

        if (initialRef.current.clientHeight !== ref.current.clientHeight) {
            console.error("Initial and ref height must be the same");
        }

        const transformOrigin = `50% 50% -${initialRef.current.clientHeight / 2}`;

        gsap.set(initialRef.current, {
            rotationX: 0,
            transformOrigin: transformOrigin,
        });
        gsap.set(ref.current, {
            rotationX: -90,
            transformOrigin: transformOrigin,
        });

        tl.to(initialRef.current, {
            duration: duration,
            rotationX: 90,
        });
        tl.to(ref.current, { duration: duration, rotationX: 0 }, 0);
    }, [state]);

    return (
        <div className="flex h-lvh w-lvw flex-col items-center justify-center bg-green-700 text-black">
            <div
                ref={initialRef}
                className="flex h-10 w-32 items-center justify-center bg-red-200"
            >
                {prevState}
            </div>
            <div
                ref={ref}
                className="flex h-10 w-32 -translate-y-full items-center justify-center bg-blue-200"
            >
                {state}
            </div>

            <button
                onClick={() => {
                    const count = Math.floor(Math.random() * 10) + 1;
                    let str = "";

                    for (let i = 0; i < count; i++) {
                        str += String.fromCharCode(
                            Math.floor(Math.random() * 26) + 65,
                        );
                    }

                    swap(str);
                }}
            >
                SWAP
            </button>
        </div>
    );
};

export const TestAdd = () => {
    const [state, setState] = useState<number[]>([]);

    return (
        <div className="relative flex h-lvh w-lvw flex-col items-center justify-start bg-green-200 text-black">
            <div className="absolute left-20 top-20 grid grid-cols-2">
                <button
                    className="bg-gray-400 px-4"
                    onClick={() => {
                        setState([...state, state.length]);
                    }}
                >
                    Add
                </button>
                <button
                    className="bg-red-200 px-4"
                    onClick={() => {
                        setState(state.slice(0, state.length - 1));
                    }}
                >
                    Subtract
                </button>
            </div>

            <div className="flex flex-col gap-2 p-2">
                {state.map((_, index) => (
                    <div
                        key={index}
                        className="flex h-10 w-32 items-center justify-center bg-amber-200"
                    >
                        {index}
                    </div>
                ))}
            </div>
        </div>
    );
};
