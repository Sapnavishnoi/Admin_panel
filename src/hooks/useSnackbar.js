import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SnackbarContext = React.createContext({});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackbarComponent() {
  const { handleClose, open, data } = React.useContext(SnackbarContext);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={data?.status || "error"}
          sx={{ width: "100%" }}
        >
          {data?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

function SnackbarProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  const showSnackbar = (message, status) => {
    setOpen(true);
    setData({
      message,
      status: status && status === "success" ? "success" : "error",
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setData({});
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        handleClose,
        open,
        data,
      }}
    >
      <SnackbarComponent />
      {children}
    </SnackbarContext.Provider>
  );
}

const useSnackbar = () => {
  const { showSnackbar } = React.useContext(SnackbarContext);

  return { showSnackbar };
};

export { SnackbarProvider, useSnackbar };
