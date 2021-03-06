import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactLoading from 'react-loading';

import InputField from '~/components/FormElement/InputField';
import PasswordField from '~/components/FormElement/PasswordField';
import FormHeader from '~/Layout/FormLayout/FormHeader';
import config from '~/config';
import styles from '~/Layout/FormLayout/FormLayout.module.scss';
import axiosClient from '~/api/axiosClient';

const cx = classNames.bind(styles);
function Register() {
  const routes = config.routes;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resMessage, setResMessage] = useState('');
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
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setIsSubmitting(true);
    axiosClient
      .post(routes.register, data)
      .then((res) => {
        if (res.code === 1) {
          localStorage.setItem('TheDrinkCurrentEmail', data.email);
          navigate(routes.verify);
        } else {
          setIsSubmitting(false);
          setResMessage('Email đã được đăng ký.');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <FormHeader to={routes.login} title="Đăng ký" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cx('form-group')}>
          <InputField name="email" form={form} label="Email adress" errorMessage={resMessage} />
        </div>
        <div className={cx('form-group')}>
          <PasswordField name="password" form={form} label="Password" />
        </div>
        <div className={cx('form-group')}>
          <PasswordField name="confirmPassword" form={form} label="Confirm password" />
        </div>
        <div className={cx('form-group')}>
          <Button fullWidth margin="normal" type="submit" variant="contained">
            Đăng ký
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
  );
}

export default Register;
