import { myFormStore } from "../myFormStore/formStore";
import { createLabelAndInputElements } from "./createLabelAndInputElement";

export const createPageOne = (slotId: string) => {
    const pageSlot = document.querySelector(slotId);
    if (!pageSlot) return;

    const store = myFormStore;

    const state = store.getState();

    const [firstNameLabel, firstNameInput] = createLabelAndInputElements({
        label: "First name:",
        placeholder: "Enter first name",
        defaultValue: state.form.pageOne.firstName,
        onchange: (event) => {
            store.setState({
                ...state,
                form: {
                    ...state.form,
                    pageOne: {
                        ...state.form.pageOne,
                        firstName: (event.target as HTMLInputElement).value,
                    },
                },
            });
        },
    });

    const [lastNameLabel, lastNameInput] = createLabelAndInputElements({
        label: "First name:",
        placeholder: "Enter first name",
        defaultValue: state.form.pageOne.lastName,
        onchange: (event) => {
            store.setState({
                ...state,
                form: {
                    ...state.form,
                    pageOne: {
                        ...state.form.pageOne,
                        lastName: (event.target as HTMLInputElement).value,
                    },
                },
            });
        },
    });

    pageSlot.append(
        firstNameLabel,
        firstNameInput,
        lastNameLabel,
        lastNameInput,
    );
};
