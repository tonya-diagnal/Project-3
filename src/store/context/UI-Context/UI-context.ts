import { createContext } from "react";

export type UIContextType = {
    showMobileSearchBar: boolean;
    toggleMobileSearchBar: () => void;
};

const UIContext = createContext<UIContextType>({
    showMobileSearchBar: false,
    toggleMobileSearchBar: () => {},
});

export default UIContext;
