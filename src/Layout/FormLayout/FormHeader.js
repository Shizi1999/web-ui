import { Fragment } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './FormLayout.module.scss';
import { images } from '~/assets/images';

const cx = classNames.bind(styles);

function FormHeader({ title, to = config.routes.home }) {
  return (
    <Fragment>
      <div className={cx('form-logo')}>
        <Link to={to} className={cx('back-icon')}>
          <FontAwesomeIcon icon={faLeftLong} />
        </Link>
        <img src={images.formLogo} alt="" />
      </div>
      <div className={cx('form-title')}>{title}</div>
    </Fragment>
  );
}

export default FormHeader;
