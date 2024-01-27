export const createLabelAndInputElements = (config: {
    label: string;
    placeholder?: string;
    defaultValue: string;
    onchange: (event: Event) => void;
}) => {
    const label = document.createElement("label");
    label.innerText = config.label;
    const inputElement = document.createElement("input");
    inputElement.placeholder = config.placeholder ?? "";
    inputElement.defaultValue = config.defaultValue;
    inputElement.onchange = config.onchange;

    return [label, inputElement] as const;
};
