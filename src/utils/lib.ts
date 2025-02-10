export const jobTypes = [
    "mechatronics",
    "fullstack",
    "software",
    "robotics",
    "mechanical",
    "electrical",
] as const;
export type JobType = (typeof jobTypes)[number];
export const allJobTypes: JobType[] = jobTypes.map((j) => j);

export const getTitles = (jobs: JobType) => {
    if (jobs === "mechatronics") return "Mechatronics Engineer";
    else if (jobs === "fullstack") return "Fullstack Developer..";
    else if (jobs === "software") return "Software Engineer....";
    else if (jobs === "robotics") return "Robotics Engineer....";
    else if (jobs === "mechanical") return "Mechanical Engineer..";
    else if (jobs === "electrical") return "Electrical Engineer..";
    else throw "Undefined Job Type";
};

export const allTitles = jobTypes.map((job) => getTitles(job));

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

export const toggleJob = (job: JobType) => {
    const selectedJobs = getSelectedJobs();
    const currentUrl = new URL(window.location.href);

    if (!selectedJobs) {
        currentUrl.searchParams.set("jobs", job);
        window.history.pushState({}, "", currentUrl.toString());
        return;
    }

    if (selectedJobs.includes(job)) {
        const newJobs = selectedJobs.filter((j) => j !== job);
        currentUrl.searchParams.set("jobs", newJobs.join(","));
    } else {
        selectedJobs.push(job);
        currentUrl.searchParams.set("jobs", selectedJobs.join(","));
    }
    window.history.pushState({}, "", currentUrl.toString());
};

export const getJobColor = (job: JobType) => {
    if (job === "mechatronics") return "red-500";
    else if (job === "fullstack") return "blue-500";
    else if (job === "software") return "green-500";
    else if (job === "robotics") return "yellow-500";
    else if (job === "mechanical") return "purple-500";
    else if (job === "electrical") return "teal-500";
};

export const arrayEqual = (arr1: any[], arr2: any[]) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};
