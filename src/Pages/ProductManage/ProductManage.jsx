import classNames from 'classnames/bind';

import styles from './ProductManage.module.scss';
const cx = classNames.bind(styles);

function ProductManage() {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Product Manage</h1>
    </div>
  );
}

export default ProductManage;
