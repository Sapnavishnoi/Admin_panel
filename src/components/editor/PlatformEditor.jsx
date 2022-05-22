import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContentShell from "../ContentShell";
import FormTextInput from "../FormTextInput";
import configData from "../../config/config.json";
import { addPlatform } from "../../services/platformService";
import { useSnackbar } from "../../hooks/useSnackbar";


const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 360,
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100% !important",
  },
  cancelButton: {
    color: theme.palette.button.secondaryTextColor,
    marginRight: `10px !important`,
    textTransform: "none !important"
  },
  submitButton: {
    color: theme.palette.common.white,
    backgroundColor: `${theme.palette.button.backgroundColor} !important`,
    textTransform: "none !important",
  },
}));

const validationSchema = Yup.object().shape({
    platform_id: Yup.string().required("Required"),
    api_key: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
});

const initialValues = {
    platform_id: "",
    api_key:"",
    name: "",
    description: " "
};

const PlatformEditor = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { showSnackbar } = useSnackbar();

  async function submitForm(values) {
    try{
        await addPlatform(values);
        showSnackbar("added successful", "success");
        
    } catch(e) {
        showSnackbar(e.message || "Please check again")
    }
  };

  const onCancel = () => navigate(configData.routes.role);

  return (
    <ContentShell title="Add Platforms">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        <Form>


          <Box className={classes.container}>
         
            <FormTextInput
              id="name"
              name="name"
              label="Name"
            />
            <FormTextInput
              id="platform_id"
              name="platform_id"
              label="Platform Id"
            />
            <FormTextInput
              id="api_key"
              name="api_key"
              label="API Key"
            />
            <FormTextInput
              id="description"
              name="description"
              label="Description"
            />
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

export default PlatformEditor;
