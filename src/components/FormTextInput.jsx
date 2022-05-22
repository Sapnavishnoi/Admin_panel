import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormInputShell, {InputShell} from "./FormInputShell";

const SimpleTextInput = ({ label, ...props }) => {
  return (
    <InputShell label={label} name={props.name}>
      <TextField
        variant="outlined"
        disabled={props.readOnly}
        inputProps={{ readOnly: props.readOnly }}
        fullWidth
        rows={props.multiline ? 4 : 1}
        rowsMax={props.multiline ? Infinity : 1}
        {...props}
      />
    </InputShell>
  );
};

const TextInput = (props) => {
  const [field, meta] = useField(props);
  const { readOnly } = props;

  return readOnly ? (
    <Typography variant="body1" gutterBottom>
      {field.value}
    </Typography>
  ) : (
    <TextField
      variant="outlined"
      disabled={readOnly}
      inputProps={{ readOnly }}
      fullWidth
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      rows={props.multiline ? 4 : 1}
      rowsMax={props.multiline ? Infinity : 1}
      {...field}
      {...props}
    />
  );
};

const FormTextInput = ({ label, ...props }) => {
  return (
    <FormInputShell label={label} name={props.name}>
      <TextInput {...props} />
    </FormInputShell>
  );
};

FormTextInput.propTypes = TextField.propTypes;

export default FormTextInput;
export { TextInput, SimpleTextInput };
