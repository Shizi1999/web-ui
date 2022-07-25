import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import styles from './AccountManage.module.scss';
import AccountItem from './AccountItem';
import axiosClient from '~/api/axiosClient';

const cx = classNames.bind(styles);

function AccountManage() {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axiosClient
      .get('/userscount', {
        params: {
          type: 'active',
        },
      })
      .then((data) => {
        setPage(Math.ceil(data.count / 5));
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get('/users', {
        params: {
          type: 'active',
          page: 0,
        },
      })
      .then((data) => {
        setAccounts(data);
      });
  }, []);
  const handleChange = (e, page) => {
    const number = page - 1;
    axiosClient
      .get('/users', {
        params: {
          type: 'active',
          page: number,
        },
      })
      .then((data) => {
        setAccounts(data);
      });
  };
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Account Manage</h1>
      <div className={cx('nav')}>
        <div className={cx('nav-item')}>Tài khoản</div>
        <div className={cx('nav-item')}>Tổng tiền mua hàng</div>
        <div className={cx('nav-item')}>Lượt mua</div>
        <div className={cx('nav-item')}>Ghi chú</div>
        <div className={cx('nav-item')}>Chặn</div>
      </div>
      {accounts.map((acc) => (
        <AccountItem key={acc._id} account={acc} />
      ))}
      <div className={cx('pagnation')}>
        <Stack spacing={2}>
          <Pagination count={page} onChange={handleChange} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
}

export default AccountManage;
