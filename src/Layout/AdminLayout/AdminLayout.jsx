import { faBars, faBook, faBoxOpen, faHouseUser, faTrash, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink, Link } from 'react-router-dom';

import config from '~/config';
import styles from './AdminLayout.module.scss';
import './reactProSidebar.scss';

const routes = config.routes;
const cx = classNames.bind(styles);
function AdminLayout({ children }) {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('sidebar')}>
        <ProSidebar collapsed={collapse} collapsedWidth="100px">
          <Menu>
            <MenuItem>
              <FontAwesomeIcon
                className={cx('sidebar-header-icon')}
                onClick={() => setCollapse(!collapse)}
                icon={faBars}
              />
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon className={cx('menu-item-icon')} icon={faHouseUser} />}
              className={cx('menu-item-text')}
            >
              <NavLink className={({ isActive }) => cx({ linkActive: isActive })} to={routes.admin}>
                Trang Chính
              </NavLink>
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon className={cx('menu-item-icon')} icon={faBoxOpen} />}
              className={cx('menu-item-text')}
            >
              <NavLink className={({ isActive }) => cx({ linkActive: isActive })} to={'/productmanage/active'}>
                Sản Phẩm
              </NavLink>
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon className={cx('menu-item-icon')} icon={faBook} />}
              className={cx('menu-item-text')}
            >
              <NavLink className={({ isActive }) => cx({ linkActive: isActive })} to={'/newsmanage/active'}>
                Bài viết
              </NavLink>
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon className={cx('menu-item-icon')} icon={faUserGear} />}
              className={cx('menu-item-text')}
            >
              <NavLink className={({ isActive }) => cx({ linkActive: isActive })} to={'/accountmanage/active'}>
                Tài khoản
              </NavLink>
            </MenuItem>
            <SubMenu
              icon={<FontAwesomeIcon icon={faTrash} className={cx('submenu-icon')} />}
              title={'Thùng rác'}
              className={cx('submenu')}
            >
              <MenuItem
                icon={<FontAwesomeIcon className={cx('menu-item-icon')} icon={faBoxOpen} />}
                className={cx('menu-item-text')}
              >
                <NavLink className={({ isActive }) => cx({ linkActive: isActive })} to={'/productmanage/trash'}>
                  Sản Phẩm
                </NavLink>
              </MenuItem>
              <MenuItem
                icon={<FontAwesomeIcon className={cx('menu-item-icon')} icon={faBook} />}
                className={cx('menu-item-text')}
              >
                <NavLink className={({ isActive }) => cx({ linkActive: isActive })} to={'/newsmanage/trash'}>
                  Bài viết
                </NavLink>
              </MenuItem>
              <MenuItem
                icon={<FontAwesomeIcon className={cx('menu-item-icon')} icon={faUserGear} />}
                className={cx('menu-item-text')}
              >
                <NavLink className={({ isActive }) => cx({ linkActive: isActive })} to={'/accountmanage/trash'}>
                  Tài khoản
                </NavLink>
              </MenuItem>
            </SubMenu>
          </Menu>
        </ProSidebar>
      </div>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <Link className={cx('header-link')} to={routes.home}>
            Chuyển đến Website của bạn.
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
