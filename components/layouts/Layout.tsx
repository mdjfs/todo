import { Box, List, menuItemClasses } from "@mui/material";
import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar, Sidebar } from "../ui";

interface Props {
  title?: string;
  children: ReactNode;
}

export const Layout: FC<Props> = ({ title = "OpenJira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box padding={2}>{children}</Box>
    </Box>
  );
};
