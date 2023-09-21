import { PropsWithChildren, useReducer } from "react";
import UIContext, { UIContextType } from "./UI-context";

enum UIReducerActions {
    "toggleMobileSearchBar",
}

type UIReducerActionType = {
    type: UIReducerActions;
};

type UIReducerStateType = {
    showSearchBar: boolean;
};
const defaultUIState: UIReducerStateType = { showSearchBar: false };

const UIReducer = (
    state: UIReducerStateType,
    action: UIReducerActionType
): UIReducerStateType => {
    switch (action.type) {
        case UIReducerActions.toggleMobileSearchBar:
            return { showSearchBar: !state.showSearchBar };
        default:
            throw new Error("Wrong action type");
    }
};

const UIProvider = (props: PropsWithChildren) => {
    const [UIState, dispatchUIAction] = useReducer(UIReducer, defaultUIState);

    const searchBarToggleHandler = () => {
        dispatchUIAction({ type: UIReducerActions.toggleMobileSearchBar });
    };

    const UIContextValue: UIContextType = {
        showMobileSearchBar: UIState.showSearchBar,
        toggleMobileSearchBar: searchBarToggleHandler,
    };
    return (
        <UIContext.Provider value={UIContextValue}>
            {props.children}
        </UIContext.Provider>
    );
};

export default UIProvider;
