import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import InputDialog from '~/components/Modal/InputDialog';
import ConfirmDialog from '~/components/Modal/ConfimDialog';

import styles from './ProductType.module.scss';

const cx = classNames.bind(styles);

function ProductTypeItem({ title, amount, slug, handleEdit = () => {}, handleDelete = () => {} }) {
  return (
    <div className={cx('producttype-wrapper')}>
      <div className={cx('producttype-item')}>{title}</div>
      <div className={cx('producttype-item')}>{amount}</div>
      <div className={cx('producttype-item')}>
        <InputDialog
          icon={faPencil}
          handleConfirm={handleEdit}
          name="Chỉnh sửa"
          title={'Hành động này sẽ cập nhật các sản phẩm cùng loại.'}
          message={title}
        />
        <div className={cx('spacing')}></div>
        <ConfirmDialog
          icon={faTrash}
          handleConfirm={() => handleDelete(slug)}
          name="Xóa"
          title={'Hành động này không thể khôi phục.'}
          message={`Xóa loại sản phẩm: ${title}`}
        />
      </div>
    </div>
  );
}

export default ProductTypeItem;
