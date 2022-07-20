import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactLoading from 'react-loading';
import { useSearchParams, useNavigate } from 'react-router-dom';

import PasswordField from '~/components/FormElement/PasswordField';
import FormHeader from '~/Layout/FormLayout/FormHeader';
import config from '~/config';
import styles from '~/Layout/FormLayout/FormLayout.module.scss';
import axiosClient from '~/api/axiosClient';

const cx = classNames.bind(styles);
function RePassword() {
  const routes = config.routes;
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('t');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const schema = yup
    .object({
      password: yup.string().required('Trường này không được để trống'),
      confirmPassword: yup
        .string()
        .required('Trường này không được để trống')
        .test('passwords-match', 'Nhập lại password không đúng.', function (value) {
          return this.parent.password === value;
        }),
    })
    .required();

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setIsSubmitting(true);
    axiosClient
      .post('/repassword', { ...data, token })
      .then((res) => {
        if (res.code === 0) {
          setErrorMessage('Link đổi mật khẩu đã hết hạn. Bạn sẽ được chuyển đến trang quên mật khẩu sau 3s.');
          setTimeout(() => {
            navigate(routes.forgetpassword);
          }, 3000);
        } else {
          setSuccessMessage('Đổi mật khẩu thành công. Bạn sẽ được chuyển đến trang đăng nhập sau 3s.');
          setTimeout(() => {
            navigate(routes.login);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <FormHeader to={routes.login} title="Đổi Mật Khẩu" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cx('form-group')}>
          <PasswordField name="password" form={form} label="Password" />
        </div>
        <div className={cx('form-group')}>
          <PasswordField name="confirmPassword" form={form} label="Confirm password" />
        </div>
        <div className={cx('form-group')}>
          <Button fullWidth margin="normal" type="submit" variant="contained">
            Xác nhận
            {isSubmitting && <ReactLoading type="spin" color="white" height={20} width={20} margin={6} />}
          </Button>
        </div>
        <div className={cx('list-btn')}>
          <Link to={routes.login} className={cx('text-btn')}>
            Đăng nhập.
          </Link>
        </div>
      </form>
      <div className={cx('error-message')}>{errorMessage}</div>
      <div className={cx('success-message')}>{successMessage}</div>
    </Fragment>
  );
}

export default RePassword;
