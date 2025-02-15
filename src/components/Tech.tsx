import { type Technology } from "../utils/lib.ts";

export const TechName = (props: { tech: Technology }) => {
    return <div className="border px-2 py-1">{props.tech}</div>;
};

export const TechWithLogo = () => {
    return <div></div>;
};
