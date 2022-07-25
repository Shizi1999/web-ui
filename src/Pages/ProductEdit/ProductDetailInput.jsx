import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './ProductEdit.module.scss';
const cx = classNames.bind(styles);
function ProductDetailInput({ onClick, option, index }) {
  const [type, setType] = useState(option.type);
  const [price, setPrice] = useState(option.price);
  const [amount, setAmount] = useState(option.amount);
  const [valid, setValid] = useState(false);

  const parentRef = useRef();

  const handleValidate = () => {
    const inputs = parentRef.current.getElementsByTagName('input');
    if (inputs[0].value === '' || inputs[1].value === 0 || inputs[1].value === '' || inputs[2].value === '') {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <div ref={parentRef} key={index} className={cx('group-input-wrapper')}>
      <div className={cx('group-input')}>
        <label className={cx('label')}>{`Loại ${index + 1}`}</label>
        <input
          onBlur={handleValidate}
          onChange={(e) => {
            setType(e.target.value);
            handleValidate();
          }}
          value={type}
          type="text"
          name="phanloai"
        />
      </div>
      <div className={cx('group-input')}>
        <label className={cx('label')}>Đơn giá</label>
        <input
          onBlur={handleValidate}
          onChange={(e) => {
            setPrice(e.target.value);
            handleValidate();
          }}
          value={price}
          type="number"
          name="price"
          min={1}
        />
      </div>
      <div className={cx('group-input')}>
        <label className={cx('label')}>Số lượng trong kho</label>
        <input
          onBlur={handleValidate}
          onChange={(e) => {
            setAmount(e.target.value);
            handleValidate();
          }}
          value={amount}
          type="number"
          name="amount"
          min={0}
        />
      </div>
      <FontAwesomeIcon onClick={() => onClick(index)} className={cx('delete-group')} icon={faXmark} />
      {valid && (
        <div className={cx('note-message')}>
          Lưu ý: Nếu bạn không nhập đầy đủ cả 3 trường thì dữ liệu sẽ không được lưu lại
        </div>
      )}
    </div>
  );
}

export default ProductDetailInput;
