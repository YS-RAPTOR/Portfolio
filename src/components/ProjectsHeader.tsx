import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

import { jobTypes, getJobColor } from "../utils/lib.ts";
import { useStore, type SelectionState, noOfSelected } from "../utils/store.ts";

const duration = 0.4;
const stagger = 0.2;

// TODO: Make the all animation the same as the others
// TODO: Make the animations run when in viewport
export const ProjectsHeader = () => {
    const ref = useRef<HTMLDivElement>(null);

    const state = useStore((s) => s.selected);
    const prevState = useStore((s) => s.prevSelected);
    const updateState = useStore((s) => s.updateSelected);
    const toggleSelected = useStore((s) => s.toggleSelected);

    useGSAP(
        () => {
            const elements: HTMLDivElement[] = gsap.utils.toArray(".swap");
            if (elements.length !== state.length)
                throw new Error("Invalid state");

            const tl = gsap.timeline();
            let pos = 0;

            for (let i = 0; i < elements.length; i++) {
                if (
                    state[i].selected == prevState[i].selected &&
                    state[i].job === prevState[i].job
                )
                    continue;

                const top = elements[i].querySelector(".swap-top")!;
                const bot = elements[i].querySelector(".swap-bot")!;

                const transformOrigin = `50% 50% -${top.clientHeight / 2}`;

                gsap.set(top, {
                    rotationX: 0,
                    transformOrigin: transformOrigin,
                });
                gsap.set(bot, {
                    rotationX: -90,
                    transformOrigin: transformOrigin,
                });

                tl.to(
                    top,
                    {
                        duration: duration,
                        rotationX: 90,
                    },
                    pos,
                );
                tl.to(bot, { duration: duration, rotationX: 0 }, pos);
                pos += stagger;
            }
        },
        { scope: ref, dependencies: [state] },
    );

    return (
        <div className="flex h-fit w-full flex-col items-center overflow-clip border-x md:w-2/3">
            <h1 className="p-2 text-lg font-extralight md:p-4 lg:p-6 lg:text-2xl">
                PROJECTS
            </h1>
            <div
                ref={ref}
                className="flex flex-wrap items-end justify-center gap-1 p-1"
            >
                <div
                    className="relative w-32 cursor-pointer overflow-clip border text-center text-sm capitalize"
                    onClick={() => {
                        if (noOfSelected(state) === state.length) {
                            updateState(
                                state.map((s) => ({ ...s, selected: false })),
                            );
                        } else {
                            updateState(
                                state.map((s) => ({ ...s, selected: true })),
                            );
                        }
                    }}
                >
                    <div
                        className={
                            "w-full transition-colors duration-200 ease-in-out " +
                            (noOfSelected(state) === state.length
                                ? "bg-zinc-50 text-zinc-950 hover:bg-zinc-400 hover:text-zinc-50"
                                : "bg-zinc-950 text-zinc-50 hover:bg-zinc-400 hover:text-zinc-950")
                        }
                    >
                        All
                    </div>
                </div>
                {jobTypes.map((job, i) => (
                    <Selector
                        key={job}
                        state={state[i]}
                        prevState={prevState[i]}
                        onClick={() => {
                            toggleSelected(i);
                        }}
                        last={i === jobTypes.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

const Selector = (props: {
    prevState: SelectionState;
    state: SelectionState;
    onClick: () => void;
    last: boolean;
}) => {
    const stateClasses = props.state.selected
        ? `bg-${getJobColor(props.state.job)} hover:bg-zinc-400`
        : `hover:bg-${getJobColor(props.state.job)}`;
    const prevStateClasses = props.prevState.selected
        ? `bg-${getJobColor(props.prevState.job)}`
        : "";

    return (
        <div
            className="swap relative w-32 cursor-pointer overflow-clip border text-center text-sm capitalize"
            onClick={props.onClick}
        >
            <div className={`swap-top w-full ${prevStateClasses}`}>
                {props.prevState.job}
            </div>
            <div
                className={`swap-bot absolute left-0 top-0 w-full transition-colors duration-200 ease-out ${stateClasses}`}
            >
                {props.state.job}
            </div>
        </div>
    );
};
