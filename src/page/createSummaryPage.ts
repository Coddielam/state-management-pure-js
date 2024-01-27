import { myFormStore } from "../myFormStore/formStore";

export const createSummaryPage = (slotId: string) => {
    const page = document.querySelector(slotId);
    if (!page) return;

    const store = myFormStore;

    const state = store.getState();

    const pageTitle = document.createElement("h1");
    pageTitle.innerText = "Summary";

    const formValues = Object.entries({
        "First name": state.form.pageOne.firstName,
        "Last name": state.form.pageOne.lastName,
        Street: state.form.pageTwo.street,
        City: state.form.pageTwo.city,
        State: state.form.pageTwo.state,
    }).map(([label, value]) => {
        const p = document.createElement("div");
        p.innerText = `${label} : ${value}`;
        return p;
    });

    page.append(pageTitle, ...formValues);
};
