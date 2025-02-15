import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TechName } from "./Tech";

type ProjectType = CollectionEntry<"projects">["data"];

// TODO: Do swap animation
// Then do flip animation to change add/remove elements
export const Projects = (props: { projects: ProjectType[] }) => {
    // TODO:
    // Step 1 - Have projects displayed
    // Step 2 - User changes selected
    // Step 3 - Move all elements to be deleted to the end using swap animation.
    // Setp 4 - Get flip state
    // Step 5 - Update state

    return (
        <div className="grid h-fit w-full grid-cols-1 px-[0.75px] sm:grid-cols-2 md:w-2/3">
            {props.projects.map((project, index) => (
                <ProjectView key={index} project={project} />
            ))}
            {props.projects.length % 2 === 1 && <ProjectView />}
        </div>
    );
};

const ProjectView = (props: { project?: ProjectType }) => {
    if (!props.project) {
        return (
            <div className="hidden aspect-square w-full bg-zinc-950 outline outline-1 outline-zinc-50 sm:block"></div>
        );
    }

    return (
        <div className="flex aspect-square h-full w-full flex-col justify-between bg-zinc-950 text-xs outline outline-1 outline-zinc-50 lg:text-base">
            <div>
                <div className="aspect-[1.5] w-full border-b"></div>
                <div className="flex w-full items-center justify-between border-b">
                    <h1 className="px-2 py-1 font-bold">
                        {props.project.title}
                    </h1>
                    <div className="flex">
                        {props.project.github && (
                            <a
                                href={props.project.github}
                                className="group relative aspect-square h-full cursor-pointer overflow-clip border-l p-2"
                            >
                                <div className="absolute inset-1 scale-0 rounded-full bg-zinc-50 transition-transform duration-200 ease-in-out group-hover:scale-150" />
                                <FaGithub className="mix-blend-difference" />
                            </a>
                        )}
                        {props.project.link && (
                            <a
                                href={props.project.link}
                                className="group relative aspect-square h-full cursor-pointer overflow-clip border-l p-2"
                            >
                                <div className="absolute inset-1 scale-0 rounded-full bg-zinc-50 transition-transform duration-200 ease-in-out group-hover:scale-150" />
                                <FaArrowUpRightFromSquare className="mix-blend-difference" />
                            </a>
                        )}
                    </div>
                </div>
                <p className="px-2">{props.project.description}</p>
            </div>
            <div className="flex flex-wrap gap-1 p-1">
                {props.project.tech.map((tech, index) => (
                    <TechName key={tech} tech={tech} />
                ))}
            </div>
        </div>
    );
};
