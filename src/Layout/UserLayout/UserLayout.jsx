import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faLocationDot, faSignOut, faTruck, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import styles from './UserLayout.module.scss';
import MainLayout from '../MainLayout/MainLayout';

const cx = classNames.bind(styles);
const routes = config.routes;

function UserLayout({ children }) {
  const sidebarItems = [
    { icon: faUser, title: 'Tài khoản', to: routes.profile },
    { icon: faTruck, title: 'Quản lý đơn hàng', to: routes.home },
    { icon: faSignOut, title: 'Đăng xuất', to: routes.home },
    // { icon: faLocationDot, title: 'Sổ địa chỉ', to: routes.home },
    // { icon: faWallet, title: 'Lịch sử giao dịch', to: routes.home },
  ];

  return (
    <MainLayout>
      <div className={cx('container')}>
        <div className={cx('sidebar')}>
          <div className={cx('sidebar-list')}>
            {sidebarItems.map((item, index) => (
              <NavLink key={index} className={({ isActive }) => cx('sidebar-item', { active: isActive })} to={item.to}>
                <FontAwesomeIcon icon={item.icon} className={cx('sidebar-item-icon')} />
                <div className={cx('sidebar-item-text')}>{item.title}</div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className={cx('content')}>{children}</div>
      </div>
    </MainLayout>
  );
}

export default UserLayout;
