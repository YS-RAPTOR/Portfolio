import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import type { CollectionEntry } from "astro:content";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TechName } from "./Tech";
import { noOfSelected, useStore, type SelectionState } from "../utils/store";

type ProjectType = CollectionEntry<"projects">["data"];
type FlipState = {
    state: Flip.FlipState | null;
    noOfSelectedProjects: number;
};

const getSelectedProjects = (
    projects: ProjectType[],
    selected: SelectionState[],
) => {
    const selectedFields = new Set();
    for (let i = 0; i < selected.length; i++) {
        if (selected[i].selected) {
            selectedFields.add(selected[i].job);
        }
    }

    const selectedProjects: (ProjectType | undefined)[] = [];

    for (let i = 0; i < projects.length; i++) {
        try {
            const projectField = new Set(projects[i].fields);
            const intersection = projectField.intersection(selectedFields);
            if (intersection.size !== 0) {
                selectedProjects.push(projects[i]);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const noOfSelectedProjects = selectedProjects.length;
    const left = projects.length - noOfSelectedProjects;

    for (let i = 0; i < left; i++) {
        selectedProjects.push(undefined);
    }

    if (selectedProjects.length !== projects.length) {
        console.error("Selected projects length is same as projects length");
    }

    return {
        noOfSelectedProjects,
        selectedProjects,
    };
};

const getDifference = (arr1: ProjectType[], arr2: ProjectType[]) => {
    const difference: ProjectType[] = [];
    if (arr1.length > arr2.length) {
        for (let i = 0; i < arr1.length; i++) {
            let found = false;
            for (let j = 0; j < arr2.length; j++) {
                if (arr1[i].title === arr2[j].title) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                difference.push(arr1[i]);
            }
        }
    } else {
        for (let i = 0; i < arr2.length; i++) {
            let found = false;
            for (let j = 0; j < arr1.length; j++) {
                if (arr2[i].title === arr1[j].title) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                difference.push(arr2[i]);
            }
        }
    }
    return difference;
};

const getNewState = (
    current: (ProjectType | undefined)[],
    projects: ProjectType[],
    selected: SelectionState[],
) => {
    const selectedJobs = new Set();
    for (let i = 0; i < selected.length; i++) {
        if (selected[i].selected) {
            selectedJobs.add(selected[i].job);
        }
    }

    const newState = structuredClone(current);
    const newSelectedProjects: ProjectType[] = [];
    const alreadyWithinCurrent: ProjectType[] = [];

    for (let i = 0; i < projects.length; i++) {
        try {
            const projectJobs = new Set(projects[i].fields);
            const intersection = projectJobs.intersection(selectedJobs);
            if (intersection.size !== 0) {
                newSelectedProjects.push(projects[i]);
            }
        } catch (e) {
            console.error(e);
        }

        if (!current[i]) continue;
        try {
            const projectJobs = new Set(current[i]!.fields);
            const intersection = projectJobs.intersection(selectedJobs);
            if (intersection.size === 0) {
                newState[i] = undefined;
            } else {
                alreadyWithinCurrent.push(current[i]!);
            }
        } catch (e) {
            console.error(e);
        }
    }

    // Find difference between newSelectedProjects and alreadyWithinCurrent
    const difference = getDifference(newSelectedProjects, alreadyWithinCurrent);

    for (let i = 0; i < newState.length; i++) {
        if (newState[i] === undefined) {
            newState[i] = difference.pop();
        }
    }
    return newState;
};

export const Projects = (props: { projects: ProjectType[] }) => {
    const ref = useRef<HTMLDivElement>(null);

    const selected = useStore((state) => state.selected);
    const selectedProjects = getSelectedProjects(props.projects, selected);
    const [flipState, setFlipState] = useState<FlipState>({
        state: null,
        noOfSelectedProjects: selectedProjects.noOfSelectedProjects,
    });
    const [state, setState] = useState({
        prev: selectedProjects.selectedProjects,
        curr: selectedProjects.selectedProjects,
    });

    useEffect(() => {
        if (!ref.current) return;

        const dom: HTMLDivElement[] = gsap.utils.toArray(".swap", ref.current);
        dom.push(ref.current);

        setFlipState({
            state: Flip.getState(dom),
            noOfSelectedProjects: getSelectedProjects(props.projects, selected)
                .noOfSelectedProjects,
        });
    }, [selected]);

    useGSAP(
        () => {
            if (!flipState.state) return;
            Flip.from(flipState.state, {
                ease: "power1.inOut",
                simple: true,
                absoluteOnLeave: true,
                nested: true,
                duration: 0.5,
                delay: 0.1,
                onEnter: (el) => {
                    return gsap.fromTo(
                        el,
                        {
                            scale: 0,
                            opacity: 0,
                            clipPath: "inset(-1px -1px -1px -1px)",
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            delay: 0.3,
                            duration: 0.3,
                            stagger: 0.1,
                        },
                    );
                },
                onLeave: (el) => {
                    return gsap.fromTo(
                        el.toReversed(),
                        {
                            clipPath: "inset(-1px -1px -1px -1px)",
                            opacity: 1,
                            zIndex: -1,
                        },
                        {
                            clipPath: "inset(-1px -1px 100% -1px)",
                            delay: -0.1,
                            opacity: 0,
                            duration: 0.2,
                            stagger: 0.05,
                        },
                    );
                },
                onComplete: () => {
                    setState({
                        prev: state.curr,
                        curr: getNewState(state.curr, props.projects, selected),
                    });
                },
            });
        },
        { scope: ref, dependencies: [flipState] },
    );

    return (
        <div
            ref={ref}
            className="grid w-full auto-rows-fr grid-cols-1 px-[0.75px] sm:grid-cols-2 md:w-2/3"
        >
            {props.projects.map((_, index) => (
                <ProjectView
                    key={index}
                    state={state.curr[index]}
                    prevState={state.prev[index]}
                    isActive={index < flipState.noOfSelectedProjects}
                />
            ))}
            <div
                className={
                    "swap relative hidden h-full w-full text-sm outline outline-1 outline-zinc-50 lg:text-base " +
                    (flipState.noOfSelectedProjects % 2 === 1 ? "sm:block" : "")
                }
            />
        </div>
    );
};

const ProjectView = (props: {
    state?: ProjectType;
    prevState?: ProjectType;
    isActive: boolean;
}) => {
    return (
        <div
            className={
                "swap relative h-full w-full text-sm outline outline-1 outline-zinc-50 lg:text-base " +
                (props.isActive ? "" : "hidden")
            }
        >
            <ProjectDetails project={props.prevState} top={true} />
            <ProjectDetails project={props.state} top={false} />
        </div>
    );
};

const ProjectDetails = (props: { project?: ProjectType; top: boolean }) => {
    if (!props.project) return null;

    const className = props.top
        ? "swap-top h-full"
        : "swap-bot absolute inset-0";

    return (
        <div
            className={"flex flex-col justify-between bg-zinc-950 " + className}
        >
            <div>
                <div className="aspect-[1.5] w-full border-b"></div>
                <div className="flex w-full justify-between border-b">
                    <h1 className="px-2 py-1 font-bold">
                        {props.project.title}
                    </h1>
                    <div className="flex">
                        {props.project.github && (
                            <a
                                href={props.project.github}
                                className="group relative flex h-full cursor-pointer items-center overflow-clip border-l bg-zinc-950 p-2"
                            >
                                <div className="absolute inset-1 scale-0 rounded-full bg-zinc-50 transition-transform duration-200 ease-in-out group-hover:scale-150" />
                                <FaGithub className="mix-blend-difference" />
                            </a>
                        )}
                        {props.project.link && (
                            <a
                                href={props.project.link}
                                className="group relative flex h-full cursor-pointer items-center overflow-clip border-l bg-zinc-950 p-2"
                            >
                                <div className="absolute inset-1 scale-0 rounded-full bg-zinc-50 transition-transform duration-200 ease-in-out group-hover:scale-150" />
                                <FaArrowUpRightFromSquare className="mix-blend-difference" />
                            </a>
                        )}
                    </div>
                </div>
                <p className="px-1">
                    {props.project.description} {props.top ? "TOP" : "BOT"}
                </p>
            </div>
            <div className="flex flex-wrap gap-1 p-1 text-xs font-light lg:text-sm">
                {props.project.tech.map((tech) => (
                    <TechName key={tech} tech={tech} />
                ))}
            </div>
        </div>
    );
};
