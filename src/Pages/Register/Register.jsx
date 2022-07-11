import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import InputField from '~/components/FormElement/InputField';
import FormHeader from '~/Layout/FormLayout/FormHeader';
import config from '~/config';
import styles from '~/Layout/FormLayout/FormLayout.module.scss';

const cx = classNames.bind(styles);
function RegisterPage() {
  const schema = yup
    .object({
      email: yup.string().required('Trường này không được để trống').email('Trường này phải là email'),
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
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Fragment>
      <FormHeader to={config.routes.login} title="Đăng ký" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cx('form-group')}>
          <InputField name="email" form={form} label="Email adress" />
        </div>
        <div className={cx('form-group')}>
          <InputField name="password" form={form} type="password" label="Password" />
        </div>
        <div className={cx('form-group')}>
          <InputField name="confirmPassword" form={form} type="password" label="Confirm password" />
        </div>
        <div className={cx('form-group')}>
          <Button fullWidth margin="normal" type="submit" variant="contained">
            Đăng ký
          </Button>
        </div>
        <div className={cx('list-btn')}>
          <Link to={'/login'} className={cx('text-btn')}>
            Đăng nhập.
          </Link>
        </div>
      </form>
    </Fragment>
  );
}

export default RegisterPage;
