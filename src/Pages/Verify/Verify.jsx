import { useState } from 'react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactLoading from 'react-loading';

import Countdown from './Countdown';
import InputField from '~/components/FormElement/InputField';
import FormHeader from '~/Layout/FormLayout/FormHeader';
import config from '~/config';
import styles from '~/Layout/FormLayout/FormLayout.module.scss';
import axiosClient from '~/api/axiosClient';

const cx = classNames.bind(styles);
function Verify() {
  const routes = config.routes;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resend, setResend] = useState(false);
  const email = localStorage.getItem('TheDrinkCurrentEmail');

  const schema = yup
    .object({
      verifyCode: yup.string().required('Trường này không được để trống'),
    })
    .required();

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      verifyCode: '',
    },
    resolver: yupResolver(schema),
  });

  const resendCode = (e) => {
    e.preventDefault();
    setResend(true);
    setTimeout(() => {
      setResend(false);
    }, 60000);
    const email = localStorage.getItem('TheDrinkCurrentEmail');
    axiosClient.post(routes.resendcode, { email });
  };
  const onSubmit = (data) => {
    setIsSubmitting(true);
    axiosClient
      .post(routes.verify, { ...data, email })
      .then((res) => {
        if (res.code === 1) {
          setSuccessMessage('Đăng ký thành công. Bạn sẽ được chuyển đến trang đăng nhập sau 3s.');
          setTimeout(() => {
            navigate(routes.login);
          }, 3000);
        } else if (res.code === 2) {
          setErrorMessage('Mã xác nhận không chính xác');
          setIsSubmitting(false);
        } else {
          setIsSubmitting(false);
          setErrorMessage('Email chưa được đăng ký. Bạn sẽ được chuyển đến trang đăng ký trong vòng 3s.');
          setTimeout(() => {
            navigate(routes.register);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <FormHeader to={routes.register} title="Xác Thực" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cx('title-verify')}>
          Một mã xác nhận đã được gửi tới Email <span>{email}</span>. Vui lòng kiểm tra email và xác nhận tại đây!
        </div>
        <div className={cx('form-group')}>
          <InputField name="verifyCode" form={form} label="Mã xác thực" errorMessage={errorMessage} />
        </div>
        <div className={cx('form-group')}>
          <Button fullWidth margin="normal" type="submit" variant="contained">
            Xác thực
            {isSubmitting && <ReactLoading type="spin" color="white" height={20} width={20} margin={6} />}
          </Button>
        </div>
        <div className={cx('list-btn')}>
          <label className={cx('resend-title')}>Chưa nhận được mã xác nhận?</label>
          <button disabled={resend} onClick={resendCode} className={cx('resend-code')}>
            Gửi lại {resend && <Countdown startTime={60} />}
          </button>
        </div>
      </form>
      <div className={cx('success-message')}>{successMessage}</div>
    </Fragment>
  );
}

export default Verify;
