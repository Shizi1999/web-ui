import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

function InputField(props) {
  const { form, name, label, errorMessage = '', ...passProps } = props;
  const { control } = form;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            error={error?.message.length > 0 || errorMessage.length > 0}
            helperText={error?.message || (errorMessage.length > 0 ? errorMessage : '')}
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
