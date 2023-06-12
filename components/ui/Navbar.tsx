import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, useContext } from "react";
import Link from "next/link";

export const Navbar: FC = () => {

  const now = new Date(). getTime();
  const futureDate = new Date('17 Jun 2023 18:00:00'). getTime();
  const timeleft = futureDate - now;
  const days = Math. floor( timeleft / (1000 * 60 * 60 * 24));

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Link href="/" prefetch>
          <Typography variant="h6" sx={{ cursor: "pointer", color: "white" }}>
            Quedan {days} días para ir a Itati
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
