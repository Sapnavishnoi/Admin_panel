import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormInputShell, { InputShell } from "./FormInputShell";

const SimpleMultiSelectInput = ({ label, ...props }) => {
  return (
    <InputShell label={label} name={props.name}>
      <Select
        multiple
        disabled={props.readOnly}
        renderValue={(selected) => selected.join(', ')}
        variant="outlined"
        fullWidth
        {...props}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={props.value.indexOf(option.id) > -1} />
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </InputShell>
  );
};

const MultiSelectInput = ({ options, readOnly, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {readOnly ? (
        <Typography variant="body1" gutterBottom>
          {options.find((option) => option.id === field.value)?.label}
        </Typography>
      ) : (
        <Select
          multiple
          disabled={readOnly}
          variant="outlined"
          renderValue={(selected) => selected.join(', ')}
          fullWidth
          error={meta.touched && !!meta.error}
          {...field}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={field.value.indexOf(option.id) > -1} />
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
      <FormHelperText error={meta.touched && !!meta.error}>
        {meta.touched && meta.error}
      </FormHelperText>
    </>
  );
};

const FormMultiSelectInput = ({ label, ...props }) => (
  <FormInputShell label={label} name={props.name}>
    <MultiSelectInput {...props} />
  </FormInputShell>
);

FormMultiSelectInput.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  ...Select.propTypes,
};

export default FormMultiSelectInput;
export { MultiSelectInput, SimpleMultiSelectInput };
