import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './ProductEdit.module.scss';
const cx = classNames.bind(styles);
function ProductDetailInput({ onClick, option, index }) {
  const [title, setTitle] = useState(option.title);
  const [price, setPrice] = useState(option.price);
  const [number, setNumber] = useState(option.number);
  return (
    <div key={index} className={cx('group-input-wrapper')}>
      <div className={cx('group-input')}>
        <label className={cx('label')}>{`Loại ${index + 1}`}</label>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          name="phanloai"
        />
      </div>
      <div className={cx('group-input')}>
        <label className={cx('label')}>Đơn giá</label>
        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
          type="number"
          name="price"
          min={0}
        />
      </div>
      <div className={cx('group-input')}>
        <label className={cx('label')}>Số lượng trong kho</label>
        <input
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          value={number}
          type="number"
          name="number"
          min={0}
        />
      </div>
      <FontAwesomeIcon onClick={() => onClick(index)} className={cx('delete-group')} icon={faXmark} />
    </div>
  );
}

export default ProductDetailInput;
