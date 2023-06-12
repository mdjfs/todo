import { List, Paper } from "@mui/material";
import React, { DragEvent, FC, useContext, useEffect, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);
  const entriesByStatus = useMemo(
    () =>
      entries
        .filter((entry) => entry.status === status)
        .map((entry) => <EntryCard key={entry._id} entry={entry} />),
    [entries, status]
  );

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (e: DragEvent) => {
    const id = e.dataTransfer.getData("text");
    updateEntry(id, { status });
    endDragging();
  };


  return (
    <div
      onDrop={onDrop}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          padding: "1px 5px",
          minHeight: "calc(70vh - 165px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <List sx={{ opacity: isDragging ? 0.8 : 1, transition: "all .3s" }}>
          {entriesByStatus}
        </List>
      </Paper>
    </div>
  );
};
