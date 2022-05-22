import React from "react";
import PropTypes from "prop-types";
import {useField} from "formik";
import {makeStyles} from "@mui/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

const useStyles = makeStyles(theme => ({
  inputLabelWrapper: {
    paddingBottom: theme.spacing(1),
  },
  formWrapper: {
    marginBottom: theme.spacing(5),
  },
}));

const InputShell = ({ label, name, children, readOnly }) => {
  const classes = useStyles();

  return (
    <Box width="100%">
      {label && <div className={classes.inputLabelWrapper}>
        <InputLabel htmlFor={name} disabled={readOnly}>
          {label}
        </InputLabel>
      </div>}
      {children}
    </Box>
  );
};

const FormInputShell = ({ label, name, children, readOnly }) => {
  const classes = useStyles();
  const [, meta] = useField({ name });

  return (
    <Box width="100%" className={classes.formWrapper}>
     {label && <div className={classes.inputLabelWrapper}>
        <InputLabel
          htmlFor={name}
          error={!!(meta.touched && meta.error)}
          disabled={readOnly}
        >
          {label}
        </InputLabel>
      </div>}
      {children}
    </Box>
  );
};

FormInputShell.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  readOnly: PropTypes.bool
};

FormInputShell.defaultProps = {
  readOnly: false
};

export default FormInputShell;
export {InputShell};
