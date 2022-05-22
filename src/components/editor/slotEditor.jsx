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

planId,
slotName,
timing,

totalSlot,
month,

amount

const validationSchema = Yup.object().shape({
    // planId: Yup.string().required("Required"),
    slotName: Yup.string().required("Required"),
    timing: Yup.string().required("Required"),
    totalSlot: Yup.string().required("Required"),
    month: Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
});

const initialValues = {
    slotName: "",
    timing:"",
    totalSlot: "",
    month: " ",
    amount:" "
};

const SlotEditor = () => {
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
    <ContentShell title="Add new slot">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        <Form>


          <Box className={classes.container}>
          
            <FormTextInput
              id="slotName"
              name="slotName"
              label="Slot Name"
            />
            <FormTextInput
              id="timing"
              name="timing"
              label="Timing"
            />
            <FormTextInput
              id="totalSlot"
              name="totalSlot"
              label="Total Number of Slot"
            />
            <FormTextInput
              id="month"
              name="month"
              label="Month"
            />
            <FormTextInput
              id="amount"
              name="amount"
              label="Amount"
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

export default SlotEditor;
