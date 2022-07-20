import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);
function Menu({ children, options = [] }) {
  return (
    <div>
      <Tippy
        interactive={true}
        offset={[20, 10]}
        render={(attrs) => (
          <div className={cx('menu-tippy')} tabIndex="-1" {...attrs}>
            {options.map((option, index) => {
              return (
                <Link key={index} className={cx('menu-item')} to={option.to}>
                  <div className={cx('menu-item-text')}>{option.title}</div>
                </Link>
              );
            })}
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default Menu;
