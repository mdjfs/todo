import { FC, ReactNode, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { entriesApi } from "../../apis";
import { Entry, EntryStatus } from "../../interfaces";
import { EntriesContext, EntriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: ReactNode;
}

export interface UpdateEntry {
  description?: string;
  status?: EntryStatus;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    const { status, data } = await entriesApi.post("/entries", { description });
    if (status == 201) {
      dispatch({ type: "[Entries] - Add-Entry", payload: data });
    }
  };

  const updateEntry = async (
    _id: string,
    { description, status }: UpdateEntry
  ) => {
    try {
      const res = await entriesApi.put(`/entries/${_id}`, {
        description,
        status,
      });
      if (res.status == 200) {
        dispatch({ type: "[Entries] - Entry-Updated", payload: res.data });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteEntry = async (_id: string) => {
    try {
      const res = await entriesApi.delete(`/entries/${_id}`);
      if (res.status == 200) {
        dispatch({ type: "[Entries] - Entry-Deleted", payload: _id });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    try {
      const { status, data } = await entriesApi.get("/entries");
      if (status == 200) {
        dispatch({ type: "[Entries] - Refresh-Data", payload: data });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
        deleteEntry,
        refreshEntries
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
