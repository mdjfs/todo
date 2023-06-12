import { List, Paper } from "@mui/material";
import { useRouter } from "next/router";
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
  const { entries, updateEntry, refreshEntries } = useContext(EntriesContext);
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

  useEffect(() => {
    if(status === 'pending') {
      (async () => {
        const reg = await navigator.serviceWorker.getRegistration();
        if(reg) {
          Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
              alert('No aceptes las notificaciones para no estar al tanto')
            } else {
              console.log(' se envia ')
              const sendPending = async () => {
                await refreshEntries()
                 const now = new Date(). getTime();
                const futureDate = new Date('17 Jun 2023 18:00:00'). getTime();
                const timeleft = futureDate - now;
                const days = Math. floor( timeleft / (1000 * 60 * 60 * 24));
                const pendings = [
                  'Quedan ' + days + ' días para ir a Itati\n',
                  'Pendientes para el viaje: ' + entries.map(entry => entry.description).join(', '),
                ]
                reg.showNotification(
                  'Pendientes',
                  {
                    tag: 'pendiente-' + new Date().toString(), // a unique ID
                    body: pendings.join('\n'), // content of the push notification
                    data: {
                      url: window.location.href, // pass the current url to the notification
                    },
                    vibrate: [200, 100, 200, 100, 200, 100, 200]
                  }
                );
                setTimeout(() => sendPending(), 43200000)
              }
              setTimeout(() => sendPending(), 20000)
            }
          });
        }
      })();
    }
      
  }, [])


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
