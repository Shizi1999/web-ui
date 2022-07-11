import { useState } from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Countdown from './Countdown';
import InputField from '~/components/FormElement/InputField';
import FormHeader from '~/Layout/FormLayout/FormHeader';
import config from '~/config';
import styles from '~/Layout/FormLayout/FormLayout.module.scss';

const cx = classNames.bind(styles);
function VerifyPage() {
  const fakeEmail = 'thanhxuanvoiva1999@gmail.com';

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

  const [resend, setResend] = useState(false);

  const resendCode = (e) => {
    e.preventDefault();
    setResend(true);
    setTimeout(() => {
      setResend(false);
    }, 60000);
  };
  const onSubmit = (data) => console.log(data);

  return (
    <Fragment>
      <FormHeader to={config.routes.register} title="Xác Thực" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cx('title-verify')}>
          Một mã xác nhận đã được gửi tới Email <span>{fakeEmail}</span>. Vui lòng kiểm tra email và xác nhận tại đây!
        </div>
        <div className={cx('form-group')}>
          <InputField name="verifyCode" form={form} label="Mã xác thực" type="password" />
        </div>
        <div className={cx('form-group')}>
          <Button fullWidth margin="normal" type="submit" variant="contained">
            Đăng nhập
          </Button>
        </div>
        <div className={cx('list-btn')}>
          <label className={cx('resend-title')}>Chưa nhận được mã xác nhận?</label>
          <button disabled={resend} onClick={resendCode} className={cx('resend-code')}>
            Gửi lại {resend && <Countdown startTime={60} />}
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default VerifyPage;
