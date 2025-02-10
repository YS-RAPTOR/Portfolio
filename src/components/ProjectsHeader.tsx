import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

import {
    getTitles,
    jobTypes,
    getSelectedJobs,
    allJobTypes,
    type JobType,
    toggleJob,
    getJobColor,
    arrayEqual,
} from "../utils/lib.ts";

type State = {
    selected: boolean;
    job: JobType;
};

const duration = 0.4;
const stagger = 0.2;
let initialState: State[] = [];

export const ProjectsHeader = () => {
    const ref = useRef<HTMLDivElement>(null);

    const [prevState, _setPrevState] = useState(
        jobTypes.map((j) => ({ selected: false, job: j })),
    );
    const [state, _setState] = useState<State[]>(
        jobTypes.map((j) => ({ selected: false, job: j })),
    );

    const setState = (s: State[]) => {
        _setPrevState(state);
        _setState(s);
    };

    useEffect(() => {
        const selected = getSelectedJobs() ?? allJobTypes;
        const newState = structuredClone(state);
        for (let i = 0; i < newState.length; i++) {
            if (selected.includes(newState[i].job)) {
                newState[i].selected = true;
            }
        }
        newState.sort((a, b) => {
            return a.selected === b.selected ? 0 : a.selected ? -1 : 1;
        });

        initialState = newState;
        setState(newState);
    }, []);

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
                className="flex flex-wrap items-end justify-center gap-px"
            >
                <div
                    className={
                        "relative w-32 bg-black text-center text-sm capitalize before:absolute before:-inset-px before:-z-10 before:bg-zinc-50 before:content-[''] after:absolute after:-top-px after:left-1/2 after:h-px after:w-lvw after:-translate-x-1/2 after:bg-zinc-50 after:content-['']"
                    }
                    onClick={() => {}}
                >
                    <div className="w-full">All</div>
                    <div className="absolute left-0 top-0 w-full">All</div>
                </div>
                {jobTypes.map((job, i) => (
                    <Selector
                        key={job}
                        state={state[i]}
                        prevState={prevState[i]}
                        onClick={() => {
                            if (state[i].selected) {
                                let notSelected = 0;
                                for (let j = 0; j < state.length; j++) {
                                    if (state[j].selected) {
                                        notSelected++;
                                    }
                                }
                                if (notSelected === 1) {
                                    alert("Must have at least one selected");

                                    return;
                                }
                            }

                            const newState = structuredClone(state);
                            const isSelected = state[i].selected;
                            toggleJob(state[i].job);

                            if (isSelected) {
                                // Unselect
                                let index = 0;

                                // Find last selected job
                                for (let j = 0; j < newState.length; j++) {
                                    if (!newState[j].selected) {
                                        break;
                                    }
                                    index = j;
                                }
                                newState[i].selected = false;
                                const temp = newState[i];
                                newState[i] = newState[index];
                                newState[index] = temp;
                            } else {
                                // Select
                                let index = 0;

                                for (let j = 0; j < newState.length; j++) {
                                    if (!newState[j].selected) {
                                        index = j;
                                        break;
                                    }
                                }
                                newState[i].selected = true;
                                const temp = newState[i];
                                newState[i] = newState[index];
                                newState[index] = temp;
                            }
                            setState(newState);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const Selector = (props: {
    prevState: State;
    state: State;
    onClick: () => void;
}) => {
    const stateClasses = props.state.selected
        ? `bg-${getJobColor(props.state.job)} hover:bg-zinc-400`
        : `hover:bg-${getJobColor(props.state.job)}`;
    const prevStateClasses = props.prevState.selected
        ? `bg-${getJobColor(props.prevState.job)}`
        : "";

    return (
        <div
            className={
                "swap relative w-32 cursor-pointer bg-black text-center text-sm capitalize before:pointer-events-none before:absolute before:-inset-px before:-z-10 before:bg-zinc-50 before:content-[''] after:pointer-events-none after:absolute after:-top-px after:left-1/2 after:h-px after:w-lvw after:-translate-x-1/2 after:bg-zinc-50 after:content-['']"
            }
            onClick={props.onClick}
        >
            <div className={`swap-top w-full bg-${prevStateClasses}`}>
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
