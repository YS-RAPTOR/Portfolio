import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

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
        <div className="aspect-square w-full bg-zinc-950 text-xs outline outline-1 outline-zinc-50 lg:text-base">
            <div className="h-2/3 w-full border-b bg-green-950"></div>
            <div className="flex w-full items-center justify-between border-b">
                <h1 className="p-1 font-bold">{props.project.title}</h1>
                <div className="flex">
                    {props.project.github && (
                        <a
                            href={props.project.github}
                            className="aspect-square h-full cursor-pointer border-l p-2"
                        >
                            <FaGithub />
                        </a>
                    )}

                    {props.project.demo && (
                        <a
                            href={props.project.demo}
                            className="aspect-square h-full cursor-pointer border-l p-2"
                        >
                            <FaArrowUpRightFromSquare />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
