import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContentShell from "../ContentShell";
import FormTextInput from "../FormTextInput";
import FormMultiSelectInput from "../FormMultiSelectInput";
import configData from "../../config/config.json";
import { useSnackbar } from "../../hooks/useSnackbar";
import { addUser } from "../../services/userService";

import sessionHelper from "../../services/sessionHelper";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
  },
  fieldConatiner: {
    width: 220,
    margin: "0 8px 0 8px",
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100% !important",
  },
  cancelButton: {
    color: theme.palette.button.secondaryTextColor,
    marginRight: `10px !important`,
    textTransform: "none !important",
  },
  submitButton: {
    color: theme.palette.common.white,
    backgroundColor: `${theme.palette.button.backgroundColor} !important`,
    textTransform: "none !important",
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Enter a valid email").required("Required"),
  password: Yup.string()
    .min(6)
    .required("Password should be atleast 6 characters"),
    mobile_number: Yup.string().required("Required"),
    secondaryMobileNumber: Yup.string(),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  mobile_number: "",
  secondaryMobileNumber:""
};

const UserEditor = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(true);
 

  async function submitForm(values) {
    setLoading(true);
    try {
      await addUser(values);
      showSnackbar("added successful", "success");
      setLoading(false);
    } catch (e) {
      showSnackbar(e.message || "Please check again");
      setLoading(false);
    }
  }

  const onCancel = () => navigate(configData.routes.user.home);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // const result = await getRoles();
        // setFilterOptions({
        //   ...filterOptions,
        //   // roles: result.map((data) => {
        //   //   return {
        //   //     label: data?.role || "",
        //   //     id: data?.role || "",
        //   //   };
        //   // }),
        // });

        setLoading(false);
      } catch (e) {
        showSnackbar(e.message || "Something went wrong.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ContentShell title="Add User" loading={loading}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        <Form>
          <Box className={classes.container}>
            <Box className={classes.fieldConatiner}>
              <FormTextInput id="name" name="name" label="Name" />
            </Box>
            <Box className={classes.fieldConatiner}>
              <FormTextInput id="email" name="email" label="Email" />
            </Box>
            <Box className={classes.fieldConatiner}>
              <FormTextInput id="password" name="password" label="Password" />
            </Box>
            <Box className={classes.fieldConatiner}>
              <FormTextInput id="mobile_number" name="mobile_number" label="Mobile Number" />
            </Box>
            <Box className={classes.fieldConatiner}>
              <FormTextInput id="secondaryMobileNumber" name="secondaryMobileNumber" label="Secondary Mobile Number" />
            </Box>
            
          
            
          </Box>
          <Box className={classes.actionContainer}>
            <Button
              variant="text"
              onClick={onCancel}
              className={classes.cancelButton}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              className={classes.submitButton}
            >
              Save
            </Button>
          </Box>
        </Form>
      </Formik>
    </ContentShell>
  );
};

export default UserEditor;
