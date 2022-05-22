import React from "react";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import Hidden from "@mui/material/Hidden";
import NavBar from "./Navbar";
import Sidebar, { drawerWidth } from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflow: "hidden",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

function AppShell({ children, actions }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => setOpen(!open);

  return (
    <>
      <Hidden smUp>
        <NavBar onToggleOpen={handleDrawerOpen} actions={actions} />
      </Hidden>
      <Sidebar open={open} onToggleOpen={handleDrawerOpen}/>
      <main
        className={classNames({
          [classes.content]: true,
          [classes.contentShift]: open,
        })}
      >
        <Hidden smDown>
          <NavBar onToggleOpen={handleDrawerOpen} actions={actions} />
        </Hidden>
        {children}
      </main>
    </>
  );
}

export default AppShell;
