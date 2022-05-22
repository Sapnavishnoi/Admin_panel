import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContentShell from "../ContentShell";
import FormTextInput from "../FormTextInput";
import FormSelectInput from "../FormSelectInput";
import { useSnackbar } from "../../hooks/useSnackbar";
import configData from "../../config/config.json";
import { addBrand } from "../../services/brandService";
import sessionHelper from "../../services/sessionHelper";

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
  platformId: Yup.string().required("Required"),
  operatorId: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const initialValues = {
  name: "",
  platformId: "",
  operatorId: "",
  description: "",
};

const BrandEditor = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { showSnackbar } = useSnackbar();

  async function submitForm(values) {
    try {
      await addBrand(values);
      showSnackbar("added successful", "success");
    } catch (e) {
      showSnackbar(e.message || "Please check again");
    }
  }

  const onCancel = () => navigate(configData.routes.operator.home);
  return (
    <ContentShell title="Add Operator">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        <Form>
          <Box className={classes.container}>
            <FormTextInput id="name" name="name" label="Name" />
            <FormSelectInput
              id="platformId"
              name="platformId"
              label="Platform"
              options={sessionHelper.allowedPlatforms.map((data) => {
                return { label: data, id: data };
              })}
            />
            <FormSelectInput
              id="operatorId"
              name="operatorId"
              label="Operator"
              options={sessionHelper.allowedOperators.map((data) => {
                return { label: data, id: data };
              })}
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

export default BrandEditor;
