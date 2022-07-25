import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductType.module.scss';
import InputDialog from '~/components/Modal/InputDialog';
import axiosClient from '~/api/axiosClient';
import { getProductType } from '~/app/productReducer';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import ProductTypeItem from './ProductTypeItem';

const cx = classNames.bind(styles);

function ProductType() {
  const { productType } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleConfirm = (value) => {
    axiosClient
      .post('/product/types/upload', { name: value })
      .then((res) => {
        if (res.code === 1) {
          dispatch(getProductType());
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getProductType());
  }, []);

  const handleDelete = (slug) => {
    axiosClient.post('/product/types/delete', { slug }).then((res) => {
      if (res.code === 1) {
        dispatch(getProductType());
      }
    });
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Danh mục sản phẩm</h1>
      <InputDialog
        handleConfirm={handleConfirm}
        title="Thêm mới danh mục sản phẩm"
        message="Nhập danh mục cần thêm"
        name="New"
        icon={faAdd}
      />
      <div className={cx('nav')}>
        <div className={cx('nav-item')}>Loại sản phẩm</div>
        <div className={cx('nav-item')}>Số lượng sản phẩm</div>
        <div className={cx('nav-item')}>Chỉnh sửa</div>
      </div>
      {productType.map((item) => (
        <ProductTypeItem
          key={item.slug}
          title={item.name}
          slug={item.slug}
          amount={item.amount}
          handleDelete={handleDelete}
        />
      ))}
      <div className={cx()}></div>
    </div>
  );
}

export default ProductType;
