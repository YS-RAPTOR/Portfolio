import { Rewrite } from "./Rewrite";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import {
    getTitles,
    jobTypes,
    getSelectedJobs,
    allTitles,
} from "../utils/lib.ts";

export const HeroHeader = () => {
    const defaultTitles = allTitles;
    const [titles, setTitle] = useState(defaultTitles);

    useEffect(() => {
        const jobs = getSelectedJobs();
        if (!jobs) return;
        const newTitles = jobs.map((job) => getTitles(job));

        // push the rest of the default titles
        for (let i = 0; i < jobTypes.length; i++) {
            if (!newTitles.includes(defaultTitles[i])) {
                newTitles.push(defaultTitles[i]);
            }
        }
        setTitle(newTitles);
    }, []);

    return (
        <div className="grid grid-flow-dense grid-cols-2 grid-rows-2">
            <h1 className="flex h-full w-full items-center justify-center border-r p-1 text-center text-lg sm:text-2xl md:text-5xl lg:text-7xl">
                Yashan
            </h1>
            <div className="flex w-full items-center justify-center gap-2 p-1">
                <FaLocationDot className="h-5 w-5 md:h-8 md:w-8 lg:h-10 lg:w-10" />
                <h2 className="text-xs font-extralight md:text-sm lg:text-base">
                    Melbourne,
                    <br />
                    Australia.
                </h2>
            </div>
            <h1 className="col-span-2 flex h-full w-full items-center justify-center border-t p-1 text-center text-sm font-light sm:text-xl md:text-3xl lg:text-5xl">
                [
                <Rewrite titles={titles} inbetween="....................." />]
            </h1>
        </div>
    );
};
