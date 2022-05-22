import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import FormInputShell, { InputShell } from "./FormInputShell";

const SimpleSelectInput = ({ label, ...props }) => {
  return (
    <InputShell label={label} name={props.name}>
      <Select
        disabled={props.readOnly}
        variant="outlined"
        fullWidth
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Placeholder</em>;
          }

          return selected;
        }}
        {...props}
      >
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </InputShell>
  );
};

const SelectInput = ({ options, readOnly, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {readOnly ? (
        <Typography variant="body1" gutterBottom>
          {options.find((option) => option.id === field.value)?.label}
        </Typography>
      ) : (
        <Select
          disabled={readOnly}
          variant="outlined"
          fullWidth
          error={meta.touched && !!meta.error}
          {...field}
          {...props}
        >
          {options.map((option) => (
            
            <MenuItem key={option.id} value={option.id} >
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

const FormSelectInput = ({ label, ...props }) => (
  <FormInputShell label={label} name={props.name} >
    <SelectInput {...props} />
  </FormInputShell>
);

FormSelectInput.defaultProps = {
  options: [],
};

FormSelectInput.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  ...Select.propTypes,
};

export default FormSelectInput;
export { SelectInput, SimpleSelectInput };
