import React from "react";
import { useField } from "formik";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FormInputShell from "./FormInputShell";
import { InputShell } from "./FormInputShell";

const SimpleDateInput = ({
  name,
  value,
  readOnly,
  onChange,
  removeBottomMargin,
  ...props
}) => (
  <InputShell name={name} label={props.label} removeBottomMargin>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {readOnly ? (
        <Typography variant="body1" gutterBottom>
          {moment(value).format("DD MMM, YYYY")}
        </Typography>
      ) : (
        <DatePicker
          autoOk
          fullWidth
          name={name}
          value={value}
          variant="inline"
          inputVariant="outlined"
          format="dd MMM, yyyy"
          readOnly={readOnly}
          disabled={readOnly}
          onChange={onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
          {...props}
          label={""}
        />
      )}
    </MuiPickersUtilsProvider>
  </InputShell>
);

const DateInput = ({ label, readOnly, ...props }) => {
  const [{ onBlur, onChange, ...field }, meta, helper] = useField(props);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {readOnly ? (
        <Typography variant="body1" gutterBottom>
          {moment(field.value).format("DD MMM, YYYY")}
        </Typography>
      ) : (
        <DatePicker
          autoOk
          fullWidth
          variant="inline"
          error={meta.touched && !!meta.error}
          inputVariant="outlined"
          format="DD MMM, YYYY"
          readOnly={readOnly}
          disabled={readOnly}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
          onChange={(date) => helper.setValue(date)}
          onClose={() => helper.setTouched(true)}
          {...field}
          {...props}
        />
      )}
      <FormHelperText error={meta.touched && !!meta.error}>
        {meta.touched && meta.error}
      </FormHelperText>
    </MuiPickersUtilsProvider>
  );
};

const FormDateInput = (props) => (
  <FormInputShell label={props.label} name={props.name}>
    <DateInput {...props} />
  </FormInputShell>
);

FormDateInput.propTypes = DatePicker.propTypes;

export default FormDateInput;
export { DateInput, SimpleDateInput };
