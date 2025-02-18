import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { useRef, useState, useEffect } from "react";

const numbers = new Array(25).fill(0).map((_, i) => i);
type ActiveFilters = { mod2: boolean; mod3: boolean };

export const Test = () => {
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        mod2: false,
        mod3: false,
    });

    return (
        <div className="relative flex h-svh w-svw flex-col items-center justify-center bg-green-200">
            <div className="absolute left-1/2 top-1 flex -translate-x-1/2 gap-2">
                <button
                    className="rounded-sm border-2 border-zinc-50 bg-red-200 p-2 font-bold"
                    onClick={() => {
                        setActiveFilters({
                            mod2: !activeFilters.mod2,
                            mod3: activeFilters.mod3,
                        });
                    }}
                >
                    Filter: mod 2 = {activeFilters.mod2 ? "on" : "off"}
                </button>
                <button
                    className="rounded-sm border-2 border-zinc-50 bg-sky-200 p-2 font-bold"
                    onClick={() => {
                        setActiveFilters({
                            mod2: activeFilters.mod2,
                            mod3: !activeFilters.mod3,
                        });
                    }}
                >
                    Filter: mod 3 = {activeFilters.mod3 ? "on" : "off"}
                </button>
            </div>
            <TestMain activeFilters={activeFilters} />
            <h1 className="w-svw bg-sky-200">HELLLO</h1>
        </div>
    );
};

function getFilteredNumbers(activeFilters: ActiveFilters, numbers: number[]) {
    return numbers.filter((i) => {
        if (activeFilters.mod2 && i % 2 !== 0) {
            return false;
        } else if (activeFilters.mod3 && i % 3 !== 0) {
            return false;
        }
        return true;
    });
}

const TestMain = (props: { activeFilters: ActiveFilters }) => {
    const ref = useRef<HTMLDivElement>(null);
    const q = gsap.utils.selector(ref);

    const [flipState, setFlipState] = useState<{
        state: Flip.FlipState | null;
        activeNo: number;
    }>({
        state: null,
        activeNo: numbers.length,
    });

    const [state, _setState] = useState<number[]>(
        getFilteredNumbers(props.activeFilters, numbers),
    );

    const [prevState, _setPrevState] = useState<number[]>(
        getFilteredNumbers(props.activeFilters, numbers),
    );

    const setState = (newState: number[]) => {
        _setPrevState(state);
        _setState(newState);
    };

    useEffect(() => {
        const filteredNumbers = getFilteredNumbers(
            props.activeFilters,
            numbers,
        );

        const dom: HTMLDivElement[] = gsap.utils.toArray(".swap", ref.current);
        dom.push(ref.current!);

        setFlipState({
            state: Flip.getState(dom),
            activeNo: filteredNumbers.length,
        });
    }, [props.activeFilters]);

    useGSAP(
        () => {
            if (!flipState.state) return;

            Flip.from(flipState.state, {
                duration: 2,
                ease: "linear",
                simple: true,
                absoluteOnLeave: true,
                nested: true,
                targets: ".swap",
                onEnter: (el) => {
                    return gsap.fromTo(
                        el,
                        {
                            opacity: 0,
                            scale: 0,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            delay: 0.2,
                            duration: 0.3,
                            stagger: 0.1,
                        },
                    );
                },
                onLeave: (el) => {
                    return gsap.fromTo(
                        el,
                        {
                            scale: 1,
                            opacity: 1,
                        },
                        {
                            scale: 0,
                            opacity: 0,
                            duration: 0.1,
                        },
                    );
                },
                onComplete: () => {
                    // setState(getFilteredNumbers(props.activeFilters, numbers));
                },
            });
        },
        { scope: ref, dependencies: [flipState] },
    );

    useGSAP(() => {}, { scope: ref, dependencies: [state] });

    return (
        <div
            ref={ref}
            className="grid auto-cols-fr grid-cols-3 gap-2 border border-zinc-950 p-2"
        >
            {state.map((n, index) => (
                <TestView key={n} i={n} isActive={index < flipState.activeNo} />
            ))}
        </div>
    );
};

const TestView = (props: { i: number; isActive: boolean }) => {
    return (
        <div
            className={
                "swap flex w-24 items-center justify-center rounded-md bg-slate-600 py-2 " +
                (props.isActive ? "block" : "hidden")
            }
        >
            {props.i}
        </div>
    );
};
