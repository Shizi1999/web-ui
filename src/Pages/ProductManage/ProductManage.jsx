import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ProductManage.module.scss';
const cx = classNames.bind(styles);

function ProductManage() {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Product Manage</h1>
      <Link className={cx('new-product-btn')} to={'/productedit/new'}>
        <FontAwesomeIcon className={cx('new-product-icon')} icon={faPlus} />
        New
      </Link>
    </div>
  );
}

export default ProductManage;
