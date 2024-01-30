# Vanilla TS State Container

## Overview

## Create a state container passing in the default state

```ts
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
```

## Get the current state

```ts
myFormStore.getState();
```

## Perform an update

```ts
myFormStore.setState((state) => {
    state.form.pageOne.lastName = (event.target as HTMLInputElement).value;
    return state;
});
```

## Observe for update on selected state value

```ts
const unobserve = store.observe(
    (state) => state.activePage,
    (activePage) => {
        updateActivePageLink(activePage);
        switchPage(activePage);
    },
);

unobserve(); // destroy the observation
```

See `state-container.interface.ts` for APIs

## Run the project

git clone and run `npm i` then run `npm run dev`
