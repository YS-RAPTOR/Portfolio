export const jobTypes = [
    "mechatronics",
    "fullstack",
    "software",
    "robotics",
    "mechanical",
    "electrical",
] as const;
export type JobType = (typeof jobTypes)[number];

const assetUnreachable = (x: never): never => {
    throw new Error(`Unreachable: ${x}`);
};

export const getTitles = (jobs: JobType) => {
    if (jobs === "mechatronics") return "Mechatronics Engineer";
    else if (jobs === "fullstack") return "Fullstack Developer..";
    else if (jobs === "software") return "Software Engineer....";
    else if (jobs === "robotics") return "Robotics Engineer....";
    else if (jobs === "mechanical") return "Mechanical Engineer..";
    else if (jobs === "electrical") return "Electrical Engineer..";
    assetUnreachable(jobs);
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

export const getTechName = (tech: Technology) => {
    if (tech === "typescript") return "TypeScript";
    else if (tech === "solidworks") return "SolidWorks";
    else if (tech === "arduino") return "Arduino";
    else if (tech === "laser cutter") return "Laser Cutter";
    else if (tech === "3d printing") return "3D Printing";
    else if (tech === "ni") return "NI";
    else if (tech === "labview") return "LabView";
    else if (tech === "pid") return "PID";
    else if (tech === "c#") return "C#";
    else if (tech === "dotnet") return ".NET";
    else if (tech === "tailwind") return "Tailwind";
    else if (tech === "tanstack query") return "TanStack Query";
    else if (tech === "azure") return "Azure";
    else if (tech === "cloudflare") return "Cloudflare";
    else if (tech === "vhdl") return "VHDL";
    else if (tech === "cpld") return "CPLD";
    else if (tech === "xilinx ise") return "Xilinx ISE";
    else if (tech === "c++") return "C++";
    else if (tech === "opencv") return "OpenCV";
    else if (tech === "abb") return "ABB Robotics";
    else if (tech === "rapid") return "ADD RAPID";
    else if (tech === "matlab") return "MATLAB";
    else if (tech === "java") return "Java";
    else if (tech === "tesseract ocr") return "Tesseract OCR";
    else if (tech === "react") return "React";
    else if (tech === "react three fiber") return "React Three Fiber";
    else if (tech === "zig") return "Zig";
    else if (tech === "python") return "Python";
    else if (tech === "fastapi") return "FastAPI";
    else if (tech === "expo") return "Expo";
    else if (tech === "react native") return "React Native";

    assetUnreachable(tech);
};
