import classNames from 'classnames/bind';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ image, className }) {
  let classes = className || '';
  classes += cx('avatar');
  return (
    <div className={classes}>
      <img src={image} alt={image} />
    </div>
  );
}

export default Avatar;
