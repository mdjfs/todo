import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entries] - Add-Entry"; payload: Entry }
  | { type: "[Entries] - Entry-Updated"; payload: Entry }
  | { type: "[Entries] - Refresh-Data"; payload: Entry[] }
  | { type: "[Entries] - Entry-Deleted"; payload: string };

export const EntriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entries] - Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "[Entries] - Entry-Updated":
      return {
        ...state,
        entries: [
          ...state.entries.filter((entry) => entry._id != action.payload._id),
          action.payload,
        ],
      };

    case "[Entries] - Entry-Deleted":
      return {
        ...state,
        entries: [
          ...state.entries.filter((entry) => entry._id != action.payload),
        ],
      };

    case "[Entries] - Refresh-Data":
      return {
        ...state,
        entries: [...action.payload],
      };

    default:
      return state;
  }
};
