import classNames from 'classnames/bind';

import styles from './NewsManage.module.scss';
const cx = classNames.bind(styles);

function NewsManage() {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Blog Manage</h1>
    </div>
  );
}

export default NewsManage;
