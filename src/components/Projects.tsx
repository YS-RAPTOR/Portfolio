import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

const projects: {
    name: string;
    description: string;
    image: string;
    link: string;
}[] = [
    {
        name: "Project 1",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 1",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 1",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 1",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 1",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 1",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 1",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 1",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
];

export const Projects = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const duration = 1;
            const ease = "expo.out";
            const position = "-=80%";
            const refs: HTMLDivElement[] = gsap.utils.toArray(".project");

            const mm = gsap.matchMedia();

            mm.add("(min-width: 640px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "-=10% center",
                        end: "bottom bottom",
                        scrub: 1,
                        once: true,
                    },
                });

                for (let i = 0; i < refs.length; i++) {
                    if (i % 2 === 0) {
                        tl.fromTo(
                            refs[i],
                            {
                                xPercent: -150,
                                duration: duration,
                            },
                            {
                                xPercent: -0.01,
                                ease: ease,
                            },
                            i === 0 ? "" : position,
                        );
                    } else {
                        tl.fromTo(
                            refs[i],
                            {
                                xPercent: 150,
                                duration: duration,
                            },
                            {
                                xPercent: 0,
                                ease: ease,
                            },
                            position,
                        );
                    }
                }
            });

            mm.add("(max-width: 639px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "-=7% bottom",
                        end: "bottom center",
                        scrub: 1,
                        once: true,
                    },
                });

                for (let i = 0; i < refs.length; i++) {
                    if (i % 2 === 0) {
                        tl.fromTo(
                            refs[i],
                            {
                                xPercent: -150,
                                duration: duration,
                            },
                            {
                                xPercent: -0.01,
                                ease: ease,
                            },
                            i === 0 ? "" : position,
                        );
                    } else {
                        tl.fromTo(
                            refs[i],
                            {
                                xPercent: 150,
                                duration: duration,
                            },
                            {
                                xPercent: 0,
                                ease: ease,
                            },
                            position,
                        );
                    }
                }
            });
        },
        { scope: ref },
    );

    return (
        <div
            ref={ref}
            className="flex h-fit w-full flex-col items-center justify-center gap-[1px] overflow-hidden md:w-2/3"
        >
            {projects.map((project, index) => {
                const classes =
                    index % 2 === 0
                        ? "bg-red-700 flex-row-reverse"
                        : "bg-green-700";

                const number = index % 2 === 0 ? "border-l" : "border-r";

                return (
                    <div
                        key={index}
                        className={
                            "project relative flex w-full border-x border-b " +
                            classes
                        }
                    >
                        <div className="hidden aspect-square min-w-[50%] bg-gray-950 sm:inline sm:min-w-[33%]" />
                        <div className="hidden h-full w-auto p-2 sm:inline">
                            <h1 className="text-sm font-bold sm:text-lg">
                                {project.name}
                            </h1>
                            <p className="text-xs font-light sm:text-base">
                                {project.description}
                            </p>
                        </div>
                        <div className="flex aspect-square min-h-fit w-full flex-col bg-gray-950 sm:hidden">
                            <div className="flex h-2/3 w-full items-center justify-center">
                                <div className="h-full w-full bg-gray-600"></div>
                            </div>
                            <div className="p-2">
                                <h1 className="text-sm font-bold sm:text-lg">
                                    {project.name}
                                </h1>
                                <p className="text-xs font-light sm:text-base">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <div
                            className={
                                "absolute flex h-12 w-12 items-center justify-center border-b text-lg " +
                                number
                            }
                        >
                            {index + 1}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
