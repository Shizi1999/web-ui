import classNames from 'classnames/bind';

import styles from './AccountManage.module.scss';
import Avatar from '~/components/Avatar/Avatar';
import formatCurrency from '~/utils/formatCurrency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem({ account }) {
  const { avatar, name, orders, note } = account;
  return (
    <div className={cx('account-item')}>
      <div className={cx('align-left')}>
        <Avatar image={avatar} />
        <span>{name}</span>
      </div>
      <div className={cx('account-item-box')}>{formatCurrency(0)}</div>
      <div className={cx('account-item-box')}>{orders}</div>
      <div className={cx('account-item-box')}>{note}</div>
      <div className={cx('account-item-box')}>
        <FontAwesomeIcon color="red" icon={faBan} />
      </div>
    </div>
  );
}

export default AccountItem;
