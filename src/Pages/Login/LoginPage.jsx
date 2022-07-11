import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import axiosClient from '~/api/axiosClient';
import InputField from '~/components/FormElement/InputField';
import FormHeader from '~/Layout/FormLayout/FormHeader';
import config from '~/config';
import styles from '~/Layout/FormLayout/FormLayout.module.scss';

const cx = classNames.bind(styles);
function LoginPage() {
  const schema = yup
    .object({
      email: yup.string().required('Trường này không được để trống').email('Trường này phải là email'),
      password: yup.string().required('Trường này không được để trống'),
    })
    .required();

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    axiosClient.post('/', { data });
  };

  return (
    <Fragment>
      <FormHeader to={config.routes.home} title="Login" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cx('form-group')}>
          <InputField name="email" form={form} label="Email adress" />
        </div>
        <div className={cx('form-group')}>
          <InputField name="password" form={form} type="password" label="Password" />
        </div>
        <div className={cx('form-group')}>
          <Button fullWidth margin="normal" type="submit" variant="contained">
            Đăng nhập
          </Button>
        </div>
        <div className={cx('list-btn')}>
          <Link to={'/'} className={cx('text-btn')}>
            Quên mật khẩu?
          </Link>
          <Link to={config.routes.register} className={cx('text-btn')}>
            Đăng kí!
          </Link>
        </div>
      </form>
    </Fragment>
  );
}

export default LoginPage;
