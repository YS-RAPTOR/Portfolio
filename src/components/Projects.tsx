import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { useGSAP } from "@gsap/react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import type { CollectionEntry } from "astro:content";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useStore, type SelectionState } from "../utils/store";
import { getTechName } from "../utils/lib.ts";

type ProjectType = CollectionEntry<"projects">["data"];
type State = {
    flip: Flip.FlipState | null;
    projects: {
        project: ProjectType;
        selected: boolean;
    }[];
};

const getSelectedProjects = (
    projects: ProjectType[],
    selected: SelectionState[],
) => {
    const selectedJobs = new Set();
    for (let i = 0; i < selected.length; i++) {
        if (selected[i].selected) selectedJobs.add(selected[i].job);
    }

    const p: State["projects"] = [];

    for (let i = 0; i < projects.length; i++) {
        try {
            const projectJobs = new Set(projects[i].fields);
            const intersection = selectedJobs.intersection(projectJobs);
            p.push({
                project: projects[i],
                selected: intersection.size > 0,
            });
        } catch (e) {
            console.error(e);
        }
    }
    return p;
};

const getNoOfSelected = (projects: State["projects"]) => {
    let count = 0;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].selected) count++;
    }
    return count;
};

export const Projects = (props: {
    projects: ProjectType[];
    [key: string]: any;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const selected = useStore((s) => s.selected);
    const [state, setState] = useState<State>({
        flip: null,
        projects: props.projects.map((p) => ({ project: p, selected: true })),
    });

    useEffect(() => {
        if (!ref.current) return;
        const dom: HTMLDivElement[] = gsap.utils.toArray(
            ".project, .special",
            ref.current,
        );
        dom.push(ref.current);
        setState({
            flip: Flip.getState(dom),
            projects: getSelectedProjects(props.projects, selected),
        });
    }, [selected]);

    useGSAP(
        () => {
            if (!state.flip) return;
            Flip.from(state.flip, {
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
            });
        },
        { scope: ref, dependencies: [state] },
    );

    return (
        <div
            ref={ref}
            className="grid w-full auto-rows-fr grid-cols-1 px-[0.75px] sm:grid-cols-2 md:w-2/3"
        >
            {state.projects.map((p, index) => (
                <ProjectView
                    project={p.project}
                    isActive={p.selected}
                    key={index}
                >
                    {props[`Image: ${p.project.title}`]}
                </ProjectView>
            ))}
            <div
                className={
                    "special relative hidden h-full w-full bg-zinc-950 text-sm outline outline-1 outline-zinc-50 lg:text-base " +
                    (getNoOfSelected(state.projects) % 2 === 1
                        ? "sm:block"
                        : "")
                }
            />
        </div>
    );
};

const ProjectView = (props: {
    project: ProjectType;
    isActive: boolean;
    children: ReactNode;
}) => {
    if (!props.children) throw new Error("No image found for project");

    return (
        <div
            className={
                "project relative flex h-full w-full flex-col justify-between bg-zinc-950 text-xs outline outline-1 outline-zinc-50 lg:text-sm " +
                (props.isActive ? "" : "hidden")
            }
        >
            <div>
                <div className="flex aspect-[1.5] w-full items-center justify-center overflow-clip border-b">
                    {props.children}
                </div>
                <div className="flex w-full justify-between border-b">
                    <h1 className="px-2 py-1 font-bold">
                        {props.project.title}
                    </h1>
                    <div className="flex">
                        {props.project.github && (
                            <a
                                href={props.project.github}
                                target="_blank"
                                className="group relative flex h-full cursor-pointer items-center overflow-clip border-l bg-zinc-950 p-2"
                            >
                                <div className="absolute inset-1 scale-0 rounded-full bg-zinc-50 transition-transform duration-200 ease-in-out group-hover:scale-150" />
                                <FaGithub className="mix-blend-difference" />
                            </a>
                        )}
                        {props.project.link && (
                            <a
                                href={props.project.link}
                                target="_blank"
                                className="group relative flex h-full cursor-pointer items-center overflow-clip border-l bg-zinc-950 p-2"
                            >
                                <div className="absolute inset-1 scale-0 rounded-full bg-zinc-50 transition-transform duration-200 ease-in-out group-hover:scale-150" />
                                <FaArrowUpRightFromSquare className="mix-blend-difference" />
                            </a>
                        )}
                    </div>
                </div>
                <p className="px-1">{props.project.description}</p>
            </div>
            <div className="flex flex-wrap gap-1 p-1 text-xs font-light lg:text-sm">
                {props.project.tech.map((tech) => (
                    <div key={tech} className="border px-1 py-0.5">
                        {getTechName(tech)}
                    </div>
                ))}
            </div>
        </div>
    );
};
