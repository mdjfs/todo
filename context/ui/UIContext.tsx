import { createContext } from "react";

interface ContextProps {
  isDragging: boolean;
  isAddingEntry: boolean;
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (status: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
