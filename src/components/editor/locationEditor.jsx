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
import { addLocation } from "../../services/roleService";
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
    addressLine1: Yup.string().required("Required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    lat: Yup.string(),
    long: Yup.string(),
});

const initialValues = {
    addressLine1: "",
    addressLine2:"",
    city:"",
    country:"",
    pincode:"",
    lat: "",
    long: " "
};

const LocationEditor = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { showSnackbar } = useSnackbar();

  async function submitForm(values) {
    try{
        await addLocation(values);
        showSnackbar("added successful", "success");
        
    } catch(e) {
        showSnackbar(e.message || "Please check again")
    }
  };

  const onCancel = () => navigate(configData.routes.role);

  return (
    <ContentShell title="Add Location">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        <Form>


          <Box className={classes.container}>
         
            <FormTextInput
              id="addressLine1"
              name="addressLine1"
              label="Address Line 1"
            />
            <FormTextInput
              id="addressLine2"
              name="addressLine2"
              label="Address Line 2"
            />
            <FormTextInput
              id="city"
              name="city"
              label="City"
            />
            <FormTextInput
              id="country"
              name="country"
              label="Country"
            />
             <FormTextInput
              id="pincode"
              name="pincode"
              label="Pincode"
            />
             <FormTextInput
              id="lat"
              name="lat"
              label="Lat"
            />
            <FormTextInput
              id="long"
              name="long"
              label="long"
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

export default LocationEditor;
