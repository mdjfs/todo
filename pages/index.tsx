import { Card,  CardHeader, Grid,  } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";
import { useContext, useEffect } from "react";
import { EntriesContext } from "../context/entries";

const HomePage: NextPage = () => {

  const { refreshEntries } = useContext(EntriesContext);

  useEffect(() => {
      (async () => {
        const reg = await navigator.serviceWorker.getRegistration();
        if(reg) {
          Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
              alert('No aceptes las notificaciones para no estar al tanto')
            } else {
              console.log(' se envia ')
              const sendPending = async () => {
                const newEntries = await refreshEntries()
                if(newEntries) {
                  const pendingEntries = newEntries.filter(entry => entry.status === 'pending')
                  if(pendingEntries.length > 0) {
                    const now = new Date(). getTime();
                    const futureDate = new Date('17 Jun 2023 18:00:00'). getTime();
                    const timeleft = futureDate - now;
                    const days = Math. floor( timeleft / (1000 * 60 * 60 * 24));
                    const pendings = [
                      'Quedan ' + days + ' días para ir a Itati\n',
                      'Pendientes para el viaje: ' + pendingEntries.map(entry => entry.description).join(', '),
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
                  }
                }
                setTimeout(() => sendPending(), 43200000)
              }
              setTimeout(() => sendPending(), 20000)
            }
          });
        }
      })();
    
  }, [])

  return (
    <Layout title="Itati">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader title="Falta" />

            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader title="Esta listo" />

            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};


export default HomePage;
