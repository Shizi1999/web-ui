import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactLoading from 'react-loading';

import axiosClient from '~/api/axiosClient';
import InputField from '~/components/FormElement/InputField';
import FormHeader from '~/Layout/FormLayout/FormHeader';
import config from '~/config';
import styles from '~/Layout/FormLayout/FormLayout.module.scss';

const cx = classNames.bind(styles);
function ForgetPasswordPage() {
  const routes = config.routes;
  const [success, setSucess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const schema = yup
    .object({
      email: yup.string().required('Trường này không được để trống').email('Trường này phải là email'),
    })
    .required();

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setIsSubmitting(true);
    setEmailMessage('');
    axiosClient.post(routes.forgetpassword, data).then((res) => {
      console.log(res);
      if (res.code === 1) {
        setSucess(true);
      } else if (res.code === 0) {
        setEmailMessage('Email chưa được đăng kí.');
        setIsSubmitting(false);
      }
    });
  };

  return !success ? (
    <Fragment>
      <FormHeader to={routes.home} title="Login" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cx('form-group')}>
          <InputField name="email" form={form} errorMessage={emailMessage} label="Email adress" />
        </div>
        <div className={cx('form-group')}>
          <Button fullWidth margin="normal" type="submit" variant="contained">
            Gửi
            {isSubmitting && <ReactLoading type="spin" color="white" height={20} width={20} margin={6} />}
          </Button>
        </div>
        <div className={cx('list-btn')}>
          <Link to={routes.login} className={cx('text-btn')}>
            Đăng nhập.
          </Link>
        </div>
      </form>
    </Fragment>
  ) : (
    <Fragment>
      <FormHeader to={routes.register} title="Xác Thực" />
      <div className={cx('title-verify')}>
        Một email đã được gửi tới địa chỉ <span>{form.getValues('email')}</span>. Vui lòng kiểm tra email và xác nhận !
      </div>
      <Link to={routes.login} className={cx('text-btn')}>
        Đăng nhập.
      </Link>
    </Fragment>
  );
}

export default ForgetPasswordPage;
