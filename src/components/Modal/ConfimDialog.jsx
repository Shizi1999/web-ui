import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

export default function ConfirmDialog({ icon, name = '', handleConfirm, title, message }) {
  const [open, setOpen] = React.useState(false);

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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              handleConfirm();
              setOpen(false);
            }}
            autoFocus
          >
            Xác Nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
