import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import ReactLoading from 'react-loading';

import styles from './Profile.module.scss';
import InputField from '~/components/FormElement/InputField';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';
import { getUserInfo } from '~/app/homeReducer';
import { images } from '~/assets/images';

const cx = classNames.bind(styles);

function Profile() {
  const { user } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
  const [selectedFile, setSelectedFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = yup
    .object({
      name: yup.string().required('Trường này không được để trống'),
      address: yup.string().required('Trường này không được để trống'),
      phone: yup
        .string()
        .required('Trường này không được để trống')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Truong nay phai la so dien thoai'),
    })
    .required();

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      address: '',
      phone: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('phone', data.phone);

    axiosClient
      .post('/user/profile', formData)
      .then((res) => {
        if (res.code === 1) {
          dispatch(getUserInfo());
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  };

  const handlePreviewAvatar = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  useEffect(() => {
    setPreviewAvatar(user.avatar);
  }, [user]);

  return (
    <div className={cx('wrapper')}>
      <h2>Hello: {user.name}</h2>
      <div className={cx('content')}>
        <div className={cx('avatar')}>
          <div className={cx('avartar-preview')}>
            <img alt="avatar" src={previewAvatar || images.noImageAvatar} />
          </div>
          <div className={cx('form-group')}>
            <div className={cx('form-text')}>Upload your avatar!</div>
            <input onChange={handlePreviewAvatar} type="file" />
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cx('profile-form')}>
          <div className={cx('user-info')}>
            <h3>Thông tin tài khoản:</h3>
            <div className={cx('user-info-item')}>
              <span className={cx('item-label')}>Email:</span>
              <span className={cx('item-content')}>{user.email}</span>
            </div>
            <div className={cx('user-info-item')}>
              <span className={cx('item-label')}>Address:</span>
              <span className={cx('item-content')}>{user.address}</span>
            </div>
            <div className={cx('user-info-item')}>
              <span className={cx('item-label')}>Phone:</span>
              <span className={cx('item-content')}>{user.phone}</span>
            </div>
          </div>
          <div className={cx('form-group')}>
            <InputField
              placeholder={user.name}
              autoComplete="off"
              form={form}
              name="name"
              label="Họ và Tên"
              size="small"
            />
          </div>
          <div className={cx('form-group')}>
            <InputField
              autoComplete="off"
              form={form}
              name="address"
              label="Địa chỉ"
              size="small"
              placeholder={user.address}
            />
          </div>
          <div className={cx('form-group')}>
            <InputField
              placeholder={user.phone}
              autoComplete="off"
              form={form}
              name="phone"
              label="Số điện thoại"
              size="small"
            />
          </div>

          <div className={cx('form-group')}>
            <Button margin="normal" type="submit" variant="contained">
              Cập nhật
              {isSubmitting && <ReactLoading type="spin" color="white" height={20} width={20} margin={6} />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
