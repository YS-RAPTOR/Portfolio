import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { Image } from "astro:assets";
import { getCollection } from "astro:content";

// TODO: Do swap animation
// Then do flip animation to change add/remove elements
export const Projects = () => {
    // TODO:
    // Step 1 - Have projects displayed
    // Step 2 - User changes selected
    // Step 3 - Move all elements to be deleted to the end using swap animation.
    // Setp 4 - Get flip state
    // Step 5 - Update state

    const projects = getCollection("projects");
    console.log(projects);

    return <div className=""></div>;
};

const ProjectView = () => {
    return <div></div>;
};
