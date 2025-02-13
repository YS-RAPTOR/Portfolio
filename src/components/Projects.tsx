import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { Image } from "astro:assets";

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
        name: "Project 2",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 3",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 4",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 5",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 6",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 7",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
    {
        name: "Project 8",
        description:
            "This is a description of project 1.This is a description of project 1.This is a description of project 1.This is a description of project 1.",
        image: "https://via.placeholder.com/150",
        link: "https://www.google.com",
    },
];

// TODO: Do swap animation
// Then do flip animation to change add/remove elements
export const Projects = () => {
    // TODO:
    // Step 1 - Have projects displayed
    // Step 2 - User changes selected
    // Step 3 - Move all elements to be deleted to the end using swap animation.
    // Setp 4 - Get flip state
    // Step 5 - Update state

    return <div className=""></div>;
};

const ProjectView = () => {
    return <div></div>;
};
