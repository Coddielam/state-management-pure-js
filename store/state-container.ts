import { IStateContainer } from "./state-container.interface";
import _isEqual from "lodash/isEqual";

type StateChangeEvent<TLatestState> = CustomEvent<{
    latestState: TLatestState;
}>;

const StateContainerEvents = {
    statechange: "statechange",
} as const;

export class StateContainer<TRootState>
    extends EventTarget
    implements IStateContainer<TRootState>
{
    private state: TRootState;

    constructor(state: TRootState) {
        super();
        this.state = state;
    }

    getState(): TRootState {
        return { ...this.state };
    }

    setState(getNewState: (state: TRootState) => TRootState): void {
        const newState = getNewState({ ...this.state });

        if (_isEqual(newState, this.state)) return;

        this.state = newState;

        this.dispatchEvent(
            new CustomEvent(StateContainerEvents.statechange, {
                detail: { latestState: this.state },
            }) satisfies StateChangeEvent<TRootState>,
        );
    }

    observe<ReturnType = any>(
        selector: (state: TRootState) => ReturnType,
        callback: (value: ReturnType) => void,
    ): () => void {
        let selectedState = selector(this.state);
        callback(selectedState);

        const listener = (event: Event) => {
            const latestState = (event as StateChangeEvent<TRootState>).detail
                .latestState;
            const newSelectedState = selector(latestState);

            if (!_isEqual(selectedState, newSelectedState)) {
                callback(newSelectedState);
                selectedState = newSelectedState;
            }
        };

        this.addEventListener(StateContainerEvents.statechange, listener);

        return () =>
            this.removeEventListener(
                StateContainerEvents.statechange,
                listener,
            );
    }
}
