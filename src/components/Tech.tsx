import { type Technology, getTechName } from "../utils/lib.ts";

export const TechName = (props: { tech: Technology }) => {
    return <div className="border px-1 py-0.5">{getTechName(props.tech)}</div>;
};

export const TechWithLogo = () => {
    return <div></div>;
};
