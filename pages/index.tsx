import Head from "next/head";
import { Inter } from "next/font/google";

import { Grid, Paper } from "@mui/material";
import Users from "@/components/Users/Users";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>CEFET-IN</title>
        <meta name="description" content="Sistema de gestão de presença para alunos do CEFET-RJ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <Grid item xs={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Users />
          </Paper>
        </Grid>
      </main>
    </>
  );
}
