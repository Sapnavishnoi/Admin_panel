import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSnackbar } from "../hooks/useSnackbar";
import FormTextInput from "../components/FormTextInput";
import {signIn} from "../services/authService";
import configData from "../config/config.json";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#505d69",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    padding: 16,
    borderRadius: 8,
    minWidth: 380,
    width: "fit-content !important",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      minWidth: 180
    },
  },
  logo: {
    display: "block",
    margin: `${theme.spacing(4)}px auto`,
    height: 42,
    width: 220,
    margin: "16px auto",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      height: 32,
    },
  },
  button: {
      textTransform: "none !important",
      width: 180
  },
  fieldContainer: {
      maxWidth: 320,
      margin: "0 auto"
  }
}));

const SignIn = () => {
  const classes = useStyles();

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  async function submitForm(values) {
    alert(values,"values..")
    try{
        await signIn(values);
        showSnackbar("login successful", "success");
        navigate(configData.routes.user.home)
    } catch(e) {
        showSnackbar(e.message || "Invalid user credentials")
    }
  }
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <img src={logo} className={classes.logo} />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email().required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={submitForm}
        >
          <Form>
            <Box className={classes.fieldContainer}>
            <FormTextInput
              name="email"
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <FormTextInput
              name="password"
              label="Password"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            </Box>
            <Box style={{ textAlign: "center", width: "100%" }}>
              <Button
                color="primary"
                disabled={loading}
                variant="contained"
                type="submit"
                className={classes.button}
              >
                Sign In
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default SignIn;
