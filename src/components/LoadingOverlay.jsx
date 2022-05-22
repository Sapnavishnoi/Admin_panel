import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
}));

const LoadingOverlayContext = React.createContext({
  _loading: false,
});

const LoadingOverlay = () => {
  const classes = useStyles();
  const { _loading } = React.useContext(LoadingOverlayContext);

  return (
    <Backdrop className={classes.backdrop} open={_loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const LoadingOverlayProvider = ({ children }) => {
  const [_loading, _setLoading] = React.useState(false);

  return (
    <LoadingOverlayContext.Provider value={{ _loading, _setLoading }}>
      <LoadingOverlay />
      {children}
    </LoadingOverlayContext.Provider>
  );
};

const useLoadingOverlay = () => {
  const { _setLoading } = React.useContext(LoadingOverlayContext);

  const showLoadingOverlay = () => _setLoading(true);

  const hideLoadingOverlay = () => _setLoading(false);

  return { showLoadingOverlay, hideLoadingOverlay };
};

export default LoadingOverlay;
export { LoadingOverlayProvider, useLoadingOverlay };
