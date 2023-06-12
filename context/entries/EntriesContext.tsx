import { createContext } from "react";
import { Entry } from "../../interfaces";
import { UpdateEntry } from "./EntriesProvider";

interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (_id: string, update: UpdateEntry) => void;
  deleteEntry: (_id: string) => void;
  refreshEntries: () => Promise<null|Entry[]>;
}

export const EntriesContext = createContext({} as ContextProps);
