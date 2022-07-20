import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTruck, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import config from '~/config';
import { images } from '~/assets/images';
import Avatar from '~/components/Avatar/Avatar';
import { useDispatch } from 'react-redux';
import { logOut } from '~/app/homeReducer';

const cx = classNames.bind(styles);
const routes = config.routes;

function UserAction({ image }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userItems = [
    {
      icon: faUser,
      title: 'Tài khoản',
      to: routes.profile,
    },
    {
      icon: faTruck,
      title: 'Quản lý đơn hàng',
      to: routes.home,
    },
  ];
  const handleSignOut = () => {
    dispatch(logOut());
    navigate('/');
  };
  return (
    <Tippy
      interactive={true}
      offset={[30, 16]}
      render={(attrs) => (
        <div className={cx('user-tippy-box')} tabIndex="-1" {...attrs}>
          {userItems.map((item, index) => (
            <Link to={item.to} key={index} className={cx('user-item')}>
              <FontAwesomeIcon className={cx('user-item-icon')} icon={item.icon} />
              <span className={cx('user-item-title')}>{item.title}</span>
            </Link>
          ))}
          <div onClick={handleSignOut} className={cx('user-item')}>
            <FontAwesomeIcon className={cx('user-item-icon')} icon={faArrowRightFromBracket} />
            <span className={cx('user-item-title')}>Đăng xuất</span>
          </div>
        </div>
      )}
    >
      <div className={cx('avatar')}>
        <Avatar image={image || images.noImageAvatar} />
      </div>
    </Tippy>
  );
}

export default UserAction;
