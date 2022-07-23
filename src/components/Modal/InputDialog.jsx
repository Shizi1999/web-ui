import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function InputDialog({ icon, name = '', handleConfirm, title, message, label = 'Input' }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className={cx('btn-product-type')} onClick={handleClickOpen}>
        {icon && <FontAwesomeIcon className={cx('btn-icon')} icon={icon} />}
        {name}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={label}
            type="text"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              handleConfirm(value);
              setOpen(false);
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InputDialog;
