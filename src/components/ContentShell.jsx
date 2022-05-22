import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  contentShell: {
    overflow: "auto ",
    maxHeight: "90vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey["300"]}`,
  },
  titleWrapper: {
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "24%",
    },
  },
  actionsWrapper: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  container: {
    overflow: "auto",
    paddingBottom: theme.spacing(4),
  },
  loadingUiWrapper: {
    width: "100%",
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 500,
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
     fontSize: 14
    },
  }
}));

function ContentShell({ loading, title, actions, children }) {
  const classes = useStyles();

  return (
    <Box className={classes.contentShell}>
      {loading ? (
        <Box className={classes.loadingUiWrapper}>
          <CircularProgress />
        </Box>
      ) : (
        <Container className={classes.container}>
          <Box width="100%" className={classes.header}>
            <Box className={classes.titleWrapper}>
              {typeof title === "string" ? (
                <Typography className={classes.title}>
                  {title}
                </Typography>
              ) : (
                title
              )}
            </Box>
            <Box className={classes.actionsWrapper}>{actions}</Box>
          </Box>
          <Box width="100%">{children}</Box>
        </Container>
      )}
    </Box>
  );
}

ContentShell.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
  ]),
  actions: PropTypes.node,
};

export default ContentShell;
