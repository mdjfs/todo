import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";
import { db } from "../database";

const HomePage: NextPage = () => {
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
