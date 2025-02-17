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
                    // setState({
                    //     prev: state.curr,
                    //     curr: getSelectedProjects(props.projects, selected)
                    //         .selectedProjects,
                    // });
                },
            });
        },
        { scope: ref, dependencies: [flipState] },
    );

    // TODO: Change _project to state
    return (
        <div
            ref={ref}
            className="grid w-full auto-rows-fr grid-cols-1 px-[0.75px] sm:grid-cols-2 md:w-2/3"
        >
            {props.projects.map((_project, index) => (
                <ProjectView
                    key={index}
                    state={_project}
                    prevState={_project}
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
            <ProjectDetails project={props.state} top={true} />
            <ProjectDetails project={props.prevState} top={false} />
        </div>
    );
};

const ProjectDetails = (props: { project?: ProjectType; top: boolean }) => {
    if (!props.project) return null;

    const className = props.top ? "swap-top" : "swap-bot absolute inset-0";

    // TODO: aspect-[1.5]
    return (
        <div
            className={"flex flex-col justify-between bg-zinc-950 " + className}
        >
            <div>
                <div className="w-full border-b"></div>
                <div className="flex w-full justify-between border-b">
                    <h1 className="px-2 py-1 font-bold">
                        {props.project.title}
                    </h1>
                    <div className="flex">
                        {props.project.github && (
                            <a
                                href={props.project.github}
                                className="group relative flex h-full cursor-pointer items-center overflow-clip border-l p-2"
                            >
                                <div className="absolute inset-1 scale-0 rounded-full bg-zinc-50 transition-transform duration-200 ease-in-out group-hover:scale-150" />
                                <FaGithub className="mix-blend-difference" />
                            </a>
                        )}
                        {props.project.link && (
                            <a
                                href={props.project.link}
                                className="group relative flex h-full cursor-pointer items-center overflow-clip border-l p-2"
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
