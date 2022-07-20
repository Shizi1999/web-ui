import classNames from 'classnames/bind';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import styles from './AccountManage.module.scss';
import { images } from '~/assets/images';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function AccountManage() {
  const accounts = [
    {
      id: 1,
      avatar: images.avatar,
      name: 'Shizi',
      payed: '1000000',
      note: 'Chậm trễ',
      orders: 10,
    },
    {
      id: 2,
      avatar: images.avatar,
      name: 'Shizi',
      payed: '1000000',
      note: 'Chậm trễ',
      orders: 10,
    },
    {
      id: 3,
      avatar: images.avatar,
      name: 'Shizi',
      payed: '1000000',
      note: 'Chậm trễ',
      orders: 10,
    },
    {
      id: 4,
      avatar: images.avatar,
      name: 'Shizi',
      payed: '1000000',
      note: 'Chậm trễ',
      orders: 10,
    },
    {
      id: 5,
      avatar: images.avatar,
      name: 'Shizi',
      payed: '1000000',
      note: 'Chậm trễ',
      orders: 10,
    },
  ];

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
        <AccountItem key={acc.id} account={acc} />
      ))}
      <div className={cx('pagnation')}>
        <Stack spacing={2}>
          <Pagination count={2} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
}

export default AccountManage;
