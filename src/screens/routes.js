import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ResponsiveProvider } from "../components/ResponsiveContext";
import {
  LoadingOverlayProvider,
  useLoadingOverlay,
} from "../components/LoadingOverlay";
import { SnackbarProvider } from "../hooks/useSnackbar";
import Home from "./Home";
import SignIn from "./SignIn";
import theme from "../theme";
import sessionHelper from "../services/sessionHelper";
import { signOut, restore } from "../services/authService";
import configData from "../config/config.json";

const muiTheme = createTheme(theme);

const PrivateRoute = ({ children }) => {
  const isLoggedIn = sessionHelper.isLoggedIn();

  return isLoggedIn ? children : <Navigate to={configData.routes.signIn} />;
};

const SessionHelper = ({ children }) => {
  const navigate = useNavigate();

  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (sessionHelper.isLoggedIn()) {
      showLoadingOverlay();

      restore()
        .then(async (result) => {
          // possible error checking the refresh token.
          // better to logout and sign in again.
          if (result.error) {
            await signOut();
            navigate(configData.routes.signIn);
          }
        })
        .finally(() => {
          setLoading(false);
          hideLoadingOverlay();
        });
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? null : <>{children}</>;
};

const Screens = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <ResponsiveProvider>
        <SnackbarProvider>
          <LoadingOverlayProvider>
            <BrowserRouter>
              <SessionHelper>
                <Routes>
                  <Route path={configData.routes.signIn} element={<SignIn />} />
                  <Route
                    path={configData.routes.home}
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </SessionHelper>
            </BrowserRouter>
          </LoadingOverlayProvider>
        </SnackbarProvider>
      </ResponsiveProvider>
    </ThemeProvider>
  );
};

export default Screens;
