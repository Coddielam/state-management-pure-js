import { IStateManager } from "./state-manager.interface";
import _isEqual from "lodash/isEqual";

type SelectorsCallbacksMap = Map<
    Symbol,
    {
        selectedState: unknown;
        callback: (selectedState: unknown) => void;
        _callbackClone: (selectedState: unknown) => void;
    }
>;

type StateChangeEvent<TLatestState> = CustomEvent<{
    latestState: TLatestState;
}>;

const StateManagerEvents = {
    statechange: "statechange",
} as const;

export class StateManager<TRootState>
    extends EventTarget
    implements IStateManager<TRootState>
{
    private state: TRootState;

    private selectorsCallbacksMap: SelectorsCallbacksMap = new Map();

    private notifyCallbacks(latestState: TRootState) {
        for (const {
            selectedState,
            callback,
            _callbackClone,
        } of this.selectorsCallbacksMap.values()) {
            const newSelectedState = _callbackClone(latestState);

            if (!_isEqual(selectedState, newSelectedState)) {
                callback(latestState);
            }
        }
    }

    constructor(state: TRootState) {
        super();
        this.state = state;

        this.addEventListener(
            StateManagerEvents.statechange,
            (stateChangeEvent) => {
                this.notifyCallbacks.bind(this)(
                    (stateChangeEvent as StateChangeEvent<TRootState>).detail
                        .latestState,
                );
            },
        );
    }

    setState(state: TRootState): void {
        this.state = state;
        this.dispatchEvent(
            new CustomEvent(StateManagerEvents.statechange, {
                detail: { latestState: state },
            }) satisfies StateChangeEvent<TRootState>,
        );
    }

    observe(
        selector: <ReturnType>(state: TRootState) => ReturnType,
        callback: (value: ReturnType<typeof selector>) => void,
    ): () => void {
        const selectedState = selector(this.state);
        callback(selectedState);

        const callbackSymbol = Symbol(callback.name);
        this.selectorsCallbacksMap.set(callbackSymbol, {
            selectedState,
            callback,
            _callbackClone: callback.bind(null),
        });

        return (() => {
            this.selectorsCallbacksMap.delete(callbackSymbol);
        }).bind(this);
    }
}
