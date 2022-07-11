import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

function InputField(props) {
  const { form, name, label, ...passProps } = props;
  const { control } = form;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            error={error?.message.length > 0 ? true : false}
            helperText={error?.message}
            label={label}
            fullWidth
            {...passProps}
            {...field}
          />
        );
      }}
    />
  );
}

export default InputField;
