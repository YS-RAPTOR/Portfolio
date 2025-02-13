import { Rewrite } from "./Rewrite";
import { FaLocationDot } from "react-icons/fa6";
import { useStore } from "../utils/store.ts";
import { getTitles } from "../utils/lib.ts";
import { useEffect, useState } from "react";

export const HeroHeader = () => {
    const selected = useStore((s) => s.selected);
    const noOfSelected = useStore((s) => s.noOfSelected);
    const [titles, setTitles] = useState(selected.map((s) => getTitles(s.job)));
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (updated) return;
        if (noOfSelected() === 0) return;

        setTitles(useStore.getState().selected.map((s) => getTitles(s.job)));
        setUpdated(true);
    }, [selected]);

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
