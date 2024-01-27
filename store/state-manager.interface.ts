type StateSelector<TRootState> = <ReturnValue>(
    state: TRootState,
) => ReturnValue;

export interface IStateManager<TRootState> {
    /**
     * @param state
     * */
    setState(state: TRootState): void;

    /**
     * @param selector a function that selects the state to be observed
     * @param callbcak a callback receiving the latest value derived from the selector
     * @returns {() => void} destroy observer function
     * */
    observe(
        selector: StateSelector<TRootState>,
        callback: (value: ReturnType<typeof selector>) => void,
    ): () => void;
}
