import { IStateContainer } from "./state-container.interface";
import _isEqual from "lodash/isEqual";

type SelectorsCallbacksMap<TRootState, TSelectedState = any> = Map<
    Symbol,
    {
        selectedState: TSelectedState;
        selector: (state: TRootState) => TSelectedState;
        callback: (selectedState: TSelectedState) => void;
    }
>;

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

    private selectorsCallbacksMap: SelectorsCallbacksMap<TRootState> =
        new Map();

    private notifyCallbacks(latestState: TRootState) {
        for (const [
            symbol,
            { selectedState, selector, callback },
        ] of this.selectorsCallbacksMap.entries()) {
            const newSelectedState = selector(latestState);

            if (!_isEqual(selectedState, newSelectedState)) {
                callback(newSelectedState);
            }

            this.selectorsCallbacksMap.set(symbol, {
                selectedState: newSelectedState,
                selector,
                callback,
            });
        }
    }

    constructor(state: TRootState) {
        super();
        this.state = state;

        this.addEventListener(
            StateContainerEvents.statechange,
            (stateChangeEvent) => {
                this.notifyCallbacks.bind(this)(
                    (stateChangeEvent as StateChangeEvent<TRootState>).detail
                        .latestState,
                );
            },
        );
    }

    getState(): TRootState {
        return { ...this.state };
    }

    setState(state: TRootState): void {
        this.state = state;
        this.dispatchEvent(
            new CustomEvent(StateContainerEvents.statechange, {
                detail: { latestState: state },
            }) satisfies StateChangeEvent<TRootState>,
        );
    }

    observe<ReturnType = any>(
        selector: (state: TRootState) => ReturnType,
        callback: (value: ReturnType) => void,
    ): () => void {
        const selectedState = selector(this.state);
        callback(selectedState);

        const callbackSymbol = Symbol(callback.name);
        this.selectorsCallbacksMap.set(callbackSymbol, {
            selectedState,
            selector,
            callback,
        });

        return (() => {
            this.selectorsCallbacksMap.delete(callbackSymbol);
        }).bind(this);
    }
}
