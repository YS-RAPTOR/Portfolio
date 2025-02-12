import { create } from "zustand";

import { jobTypes, type JobType, getSelectedJobs } from "./lib.ts";

export type SelectionState = {
    selected: boolean;
    job: JobType;
};

interface Store {
    selected: SelectionState[];
    prevSelected: SelectionState[];

    initializeState: () => void;
    updateSelected: (s: SelectionState[]) => void;
    noOfSelected: () => number;
    toggleSelected: (job: number) => void;
}

export const useStore = create<Store>()((set, get) => ({
    selected: jobTypes.map((j) => ({ selected: false, job: j })),
    prevSelected: jobTypes.map((j) => ({ selected: false, job: j })),

    initializeState: () => {
        set((s) => {
            const selected = getSelectedJobs() ?? jobTypes;
            const newSelected = structuredClone(s.selected);

            for (let i = 0; i < newSelected.length; i++) {
                if (selected.includes(newSelected[i].job)) {
                    newSelected[i].selected = true;
                }
            }
            newSelected.sort((a, b) => {
                return a.selected === b.selected ? 0 : a.selected ? -1 : 1;
            });

            return {
                selected: newSelected,
                prevSelected: s.selected,
            };
        });
    },

    updateSelected: (selected: SelectionState[]) => {
        set((s) => {
            const currentUrl = new URL(window.location.href);
            let jobs: JobType[] = [];

            for (let i = 0; i < selected.length; i++) {
                if (selected[i].selected) {
                    jobs.push(selected[i].job);
                }
            }

            if (jobs.length === 0) {
                selected[0].selected = true;
                jobs.push(selected[0].job);
            }

            currentUrl.searchParams.set("jobs", jobs.join(","));
            window.history.pushState({}, "", currentUrl.toString());

            return {
                selected: selected,
                prevSelected: s.selected,
            };
        });
    },

    toggleSelected: (jobIndex: number) => {
        const newSelected = structuredClone(get().selected);

        if (newSelected[jobIndex].selected && get().noOfSelected() === 1) {
            alert("Must have at least one selected");
            return;
        }

        if (newSelected[jobIndex].selected) {
            // Unselect
            let index = 0;

            // Find last selected job
            for (let i = 0; i < newSelected.length; i++) {
                if (!newSelected[i].selected) {
                    break;
                }
                index = i;
            }
            newSelected[jobIndex].selected = false;
            const temp = newSelected[jobIndex];
            newSelected[jobIndex] = newSelected[index];
            newSelected[index] = temp;
        } else {
            // Select
            let index = 0;

            for (let i = 0; i < newSelected.length; i++) {
                if (!newSelected[i].selected) {
                    index = i;
                    break;
                }
            }
            newSelected[jobIndex].selected = true;
            const temp = newSelected[jobIndex];
            newSelected[jobIndex] = newSelected[index];
            newSelected[index] = temp;
        }
        get().updateSelected(newSelected);
    },

    noOfSelected: () => {
        const selected = get().selected;

        let noSelected = 0;
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].selected) noSelected++;
        }
        return noSelected;
    },
}));
