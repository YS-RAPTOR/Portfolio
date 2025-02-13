export const jobTypes = [
    "mechatronics",
    "fullstack",
    "software",
    "robotics",
    "mechanical",
    "electrical",
] as const;
export type JobType = (typeof jobTypes)[number];

export const getTitles = (jobs: JobType) => {
    if (jobs === "mechatronics") return "Mechatronics Engineer";
    else if (jobs === "fullstack") return "Fullstack Developer..";
    else if (jobs === "software") return "Software Engineer....";
    else if (jobs === "robotics") return "Robotics Engineer....";
    else if (jobs === "mechanical") return "Mechanical Engineer..";
    else if (jobs === "electrical") return "Electrical Engineer..";
    else throw "Undefined Job Type";
};

export const getSelectedJobs = (): JobType[] | null => {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("jobs");
    if (!param) return null;

    const jobs = param.split(",");
    const correctedJobs: JobType[] = [];

    for (let i = 0; i < jobs.length; i++) {
        if (jobTypes.includes(jobs[i] as JobType)) {
            correctedJobs.push(jobs[i] as JobType);
        } else {
            console.error(`Invalid job type: ${jobs[i]}`);
        }
    }
    return correctedJobs;
};

export const getJobColor = (job: JobType) => {
    if (job === "mechatronics") return "red-500";
    else if (job === "fullstack") return "blue-500";
    else if (job === "software") return "green-500";
    else if (job === "robotics") return "yellow-500";
    else if (job === "mechanical") return "purple-500";
    else if (job === "electrical") return "teal-500";
};

export const technologies = [
    "typescript",
    "solidworks",
    "arduino",
    "laser cutter",
    "3d printing",
    "ni",
    "labview",
    "pid",
    "c#",
    "dotnet",
    "tailwind",
    "tanstack query",
    "azure",
    "cloudflare",
    "vhdl",
    "cpld",
    "xilinx ise",
    "c++",
    "opencv",
    "abb",
    "rapid",
    "matlab",
    "java",
    "tesseract ocr",
    "react",
    "react three fiber",
    "zig",
    "python",
    "fastapi",
    "expo",
    "react native",
] as const;

export type Technology = (typeof technologies)[number];
