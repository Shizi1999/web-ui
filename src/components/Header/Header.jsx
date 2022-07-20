import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { faAngleDown, faArrowDown, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.scss';
import config from '~/config';
import { images } from '~/assets/images';
import UserAction from './UserAction';
import { getUserInfo } from '~/app/homeReducer';
import Menu from '../Menu/Menu';

const cx = classNames.bind(styles);
const routes = config.routes;

function Header() {
  const userState = useSelector((state) => state.home);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const newsOptions = [
    {
      to: '/news/new',
      title: 'Bài viết mới',
    },
    {
      to: '/news/popular',
      title: 'Bài viết nổi bật',
    },
  ];

  return (
    <header className={cx('header')}>
      <nav className={cx('navbar')}>
        <ul className={cx('nav-item')}>
          <li>
            <NavLink to={routes.home}>
              <img className={cx('logo')} alt="logo" src={images.logo} />
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.home} className={({ isActive }) => cx('nav-item-link', { active: isActive })}>
              Trang Chủ
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.admin} className={({ isActive }) => cx('nav-item-link', { active: isActive })}>
              Admin
            </NavLink>
          </li>
          <Menu options={newsOptions}>
            <li>
              <NavLink to={'/news/all'} className={({ isActive }) => cx('nav-item-link', { active: isActive })}>
                Bài Viết
                <FontAwesomeIcon className={cx('menu-icon')} icon={faAngleDown} />
              </NavLink>
            </li>
          </Menu>
          <li>
            <NavLink to={routes.detail} className={({ isActive }) => cx('nav-item-link', { active: isActive })}>
              Sản phẩm
            </NavLink>
          </li>
        </ul>
        <ul className={cx('nav-item')}>
          <li>
            <div className={cx('user-cart')}>
              <FontAwesomeIcon color="white" fontSize={'1.6rem'} icon={faShoppingCart} />
            </div>
          </li>
          {!userState.isLogin ? (
            <li>
              <Link className={cx('user-header-link')} to={routes.register}>
                Đăng ký
              </Link>
              <div className={cx('spacer')}></div>
              <Link className={cx('user-header-link')} to={routes.login}>
                Đăng nhập
              </Link>
            </li>
          ) : (
            <li className={cx('avatar')}>
              <UserAction image={userState.user.avatar} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
