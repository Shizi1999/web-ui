import classNames from 'classnames/bind';

import styles from './FormLayout.module.scss';
import { images } from '~/assets/images';

const cx = classNames.bind(styles);
function FormLayout({ children }) {
  return (
    <div className={cx('wrapper')} style={{ backgroundImage: `url(${images.background})` }}>
      <div className={cx('container')}>{children}</div>
    </div>
  );
}

export default FormLayout;
