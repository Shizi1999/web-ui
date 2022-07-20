import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
            type={showPassword ? 'text' : 'password'}
            fullWidth
            {...passProps}
            {...field}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon className={'password-show-hide'} icon={faEye} />
                    ) : (
                      <FontAwesomeIcon className={'password-show-hide'} icon={faEyeSlash} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
}

export default PasswordField;
