import { myFormStore } from "../myFormStore/formStore";
import { createLabelAndInputElements } from "./createLabelAndInputElement";

export const createPageTwo = (slotId: string) => {
    const pageSlot = document.querySelector(slotId);
    if (!pageSlot) return;

    const store = myFormStore;

    const state = store.getState();

    const [streetLabel, streetInput] = createLabelAndInputElements({
        label: "Street:",
        placeholder: "Street name",
        defaultValue: state.form.pageTwo.street,
        onchange: (event) => {
            store.setState((state) => {
                state.form.pageTwo.street = (
                    event.target as HTMLInputElement
                ).value;
                return state;
            });
        },
    });

    const [cityLabel, cityInput] = createLabelAndInputElements({
        label: "City:",
        placeholder: "City name",
        defaultValue: state.form.pageTwo.city,
        onchange: (event) => {
            store.setState((state) => {
                state.form.pageTwo.city = (
                    event.target as HTMLInputElement
                ).value;
                return state;
            });
        },
    });

    const [stateLabel, stateInput] = createLabelAndInputElements({
        label: "State:",
        placeholder: "State",
        defaultValue: state.form.pageTwo.state,
        onchange: (event) => {
            store.setState((state) => {
                state.form.pageTwo.state = (
                    event.target as HTMLInputElement
                ).value;
                return state;
            });
        },
    });

    pageSlot.append(
        streetLabel,
        streetInput,
        cityLabel,
        cityInput,
        stateLabel,
        stateInput,
    );
};
