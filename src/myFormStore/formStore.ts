import { StateContainer } from "../../store/state-container";

export const myFormStore = new StateContainer({
    activePage: 1,
    form: {
        pageOne: {
            firstName: "Eddie",
            lastName: "",
        },
        pageTwo: {
            street: "",
            city: "",
            state: "",
        },
    },
});

export type MyFormStore = typeof myFormStore;
